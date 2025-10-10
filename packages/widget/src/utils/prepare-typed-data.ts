/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type AbiParameter,
  type HashTypedDataParameters,
  type HashTypedDataReturnType,
  type Hex,
  type TypedData,
  concat,
  encodeAbiParameters,
  getTypesForEIP712Domain,
  hashDomain,
  InternalRpcError,
  keccak256,
  toHex,
  TypedDataDefinition,
  validateTypedData,
} from 'viem';

interface MessageTypeProperty {
  name: string;
  type: string;
}

// * This function cloned from "hashTypedData" function in "viem" package
// ! "hashTypedData" is keccak256 typedData by default
// ! => could NOT send result to server
export function prepareTypedData<
  typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
>(parameters: HashTypedDataParameters<typedData, primaryType>): HashTypedDataReturnType {
  const { domain = {}, message, primaryType } = parameters as HashTypedDataParameters;
  const types = {
    EIP712Domain: getTypesForEIP712Domain({ domain }),
    ...parameters.types,
  };

  // Need to do a runtime validation check on addresses, byte ranges, integer ranges, etc
  // as we can't statically check this with TypeScript.
  validateTypedData({
    domain,
    message,
    primaryType,
    types,
  });

  const parts: Hex[] = ['0x1901'];
  if (domain)
    parts.push(
      hashDomain({
        domain,
        types: types as Record<string, MessageTypeProperty[]>,
      }),
    );

  if (primaryType !== 'EIP712Domain')
    parts.push(
      hashStruct({
        data: message,
        primaryType,
        types: types as Record<string, MessageTypeProperty[]>,
      }),
    );

  return concat(parts);
}

export function hashStruct({
  data,
  primaryType,
  types,
}: {
  data: Record<string, unknown>;
  primaryType: string;
  types: Record<string, readonly MessageTypeProperty[]>;
}) {
  const encoded = encodeData({
    data,
    primaryType,
    types,
  });
  return keccak256(encoded);
}

function encodeData({
  data,
  primaryType,
  types,
}: {
  data: Record<string, unknown>;
  primaryType: string;
  types: Record<string, readonly MessageTypeProperty[]>;
}) {
  const encodedTypes: AbiParameter[] = [{ type: 'bytes32' }];
  const encodedValues: unknown[] = [hashType({ primaryType, types })];

  for (const field of types[primaryType] as MessageTypeProperty[]) {
    const [type, value] = encodeField({
      types,
      name: field.name,
      type: field.type,
      value: data[field.name],
    });
    encodedTypes.push(type);
    encodedValues.push(value);
  }

  return encodeAbiParameters(encodedTypes, encodedValues);
}

function hashType({
  primaryType,
  types,
}: {
  primaryType: string;
  types: Record<string, readonly MessageTypeProperty[]>;
}) {
  const encodedHashType = toHex(encodeType({ primaryType, types }));
  return keccak256(encodedHashType);
}

export function encodeType({
  primaryType,
  types,
}: {
  primaryType: string;
  types: Record<string, readonly MessageTypeProperty[]>;
}) {
  let result = '';
  const unsortedDeps = findTypeDependencies({ primaryType, types });
  unsortedDeps.delete(primaryType);

  const deps = [primaryType, ...Array.from(unsortedDeps).sort()];
  for (const type of deps) {
    result += `${type}(${(types[type] as MessageTypeProperty[]).map(({ name, type: t }) => `${t} ${name}`).join(',')})`;
  }

  return result;
}

function findTypeDependencies(
  {
    primaryType: primaryType_,
    types,
  }: {
    primaryType: string;
    types: Record<string, readonly MessageTypeProperty[]>;
  },
  results: Set<string> = new Set(),
): Set<string> {
  const match = primaryType_.match(/^\w*/u);
  const primaryType = match?.[0]!;
  if (results.has(primaryType) || types[primaryType] === undefined) {
    return results;
  }

  results.add(primaryType);

  for (const field of types[primaryType] as MessageTypeProperty[]) {
    findTypeDependencies({ primaryType: field.type, types }, results);
  }
  return results;
}

function encodeField({
  types,
  name,
  type,
  value,
}: {
  types: Record<string, readonly MessageTypeProperty[]>;
  name: string;
  type: string;
  value: any;
}): [type: AbiParameter, value: any] {
  if (types[type] !== undefined) {
    return [{ type: 'bytes32' }, keccak256(encodeData({ data: value, primaryType: type, types }))];
  }

  if (type === 'bytes') {
    const prepend = value.length % 2 ? '0' : '';
    value = `0x${prepend + value.slice(2)}`;
    return [{ type: 'bytes32' }, keccak256(value)];
  }

  if (type === 'string') return [{ type: 'bytes32' }, keccak256(toHex(value))];

  if (type.lastIndexOf(']') === type.length - 1) {
    const parsedType = type.slice(0, type.lastIndexOf('['));
    const typeValuePairs = (value as [AbiParameter, any][]).map(item =>
      encodeField({
        name,
        type: parsedType,
        types,
        value: item,
      }),
    );
    return [
      { type: 'bytes32' },
      keccak256(
        encodeAbiParameters(
          typeValuePairs.map(([t]) => t),
          typeValuePairs.map(([, v]) => v),
        ),
      ),
    ];
  }

  return [{ type }, value];
}

export function parseTypedData(data: TypedDataDefinition | string): TypedDataDefinition {
  let typedData: TypedDataDefinition;
  try {
    if (typeof data === 'string') {
      typedData = JSON.parse(data) as TypedDataDefinition;
    } else {
      typedData = data;
    }
    return typedData;
  } catch (err) {
    throw new InternalRpcError(new Error(`Unable to parse typedData="${data}".`, { cause: err }));
  }
}
