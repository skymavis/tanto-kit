import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { hexToString, isHex, UserRejectedRequestError } from 'viem';

import { XIcon } from './assets/XIcon';
import { Box } from './components/box/Box';
import { Button, IconButton } from './components/button/Button';
import { CSSReset } from './components/css-reset/CSSReset';
import { FlexModal } from './components/flex-modal/FlexModal';
import { useTantoConfig } from './contexts/tanto/useTantoConfig';
import { HeadlessOperationType, HeadlessTask } from './services/HeadlessAsyncTaskManager';
import { headlessInjector } from './services/headlessInjector';

const Title = styled.div({
  alignItems: 'center',
  fontSize: '1.25em',
  fontWeight: 500,
  marginTop: 8,
});

const Description = styled.div(({ theme }) => ({
  color: theme.mutedText,
}));

const ParamsKey = styled.strong({
  fontWeight: 500,
});

const ParamsContainer = styled.pre(({ theme }) => ({
  color: theme.mutedText,
  marginLeft: 8,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  tabSize: 2,
  overflow: 'auto',
  maxHeight: 240,
}));

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <IconButton
      css={{ position: 'absolute', top: 0, right: 0 }}
      intent="secondary"
      variant="plain"
      aria-label="Close"
      icon={<XIcon />}
      onClick={onClick}
    />
  );
}

function getModalContent(task: HeadlessTask) {
  if (task.operationType === HeadlessOperationType.PersonalSign) {
    const [data] = task.params;
    return {
      title: 'Sign Message',
      description: 'You are requested to sign a message. It will not cost you any fees.',
      details: {
        Message: isHex(data) ? hexToString(data) : data,
      },
    };
  }

  if (task.operationType === HeadlessOperationType.SignTypedDataV4) {
    const typedData = task.params[1];
    return {
      title: 'Sign Message',
      description: 'You are requested to sign a message. It will not cost you any fees.',
      details: {
        'Typed Data':
          typeof typedData === 'string'
            ? isHex(typedData)
              ? hexToString(typedData)
              : typedData
            : JSON.stringify(typedData, null, 2),
      },
    };
  }

  if (task.operationType === HeadlessOperationType.SendTransaction) {
    const [transaction] = task.params;
    return {
      title: 'Send Transaction',
      description: 'You are requested to send following transaction.',
      details: {
        To: transaction.to || 'Contract Creation',
        Value: transaction.value ? `${parseInt(transaction.value, 16)} wei` : '0 wei',
        Gas: transaction.gas ? `${parseInt(transaction.gas, 16)}` : 'Auto',
        'Gas Price': transaction.gasPrice ? `${parseInt(transaction.gasPrice, 16)} wei` : 'Auto',
        Data: transaction.data || transaction.input || 'None',
      },
    };
  }

  return {
    title: 'Confirmation Request',
    description: 'Please review and confirm this operation.',
    details: {
      Operation: 'Unknown',
      Params: 'Unknown parameters',
    },
  };
}

export function ConfirmationModal() {
  const { showConfirmationModal } = useTantoConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState<HeadlessTask | null>(null);
  const headlessAsyncTaskManager = headlessInjector.resolve('headlessAsyncTaskManager');
  const closeModal = () => setIsOpen(false);

  const handleRemoveTaskOnClose = () => {
    if (!task) return;
    headlessAsyncTaskManager.cancelTask(task.id);
    closeModal();
  };

  const handleCancel = () => {
    if (!task) return;
    headlessAsyncTaskManager.rejectTask(task.id, new UserRejectedRequestError(new Error('User rejected request')));
    closeModal();
  };

  const handleConfirm = () => {
    if (!task) return;
    headlessAsyncTaskManager.resolveTask(task.id);
    closeModal();
  };

  useEffect(() => {
    const unsubscribe = showConfirmationModal
      ? headlessAsyncTaskManager.onTaskCreated(({ taskId, operationType, params }) => {
          setTask({ id: taskId, operationType, params } as HeadlessTask);
          setIsOpen(true);
        })
      : headlessAsyncTaskManager.onTaskCreated(({ taskId }) => {
          headlessAsyncTaskManager.resolveTask(taskId);
        });

    return () => {
      unsubscribe();
    };
  }, [showConfirmationModal, headlessAsyncTaskManager]);

  if (!task) return null;

  const modalContent = getModalContent(task);

  return (
    <FlexModal open={isOpen} onOpenChange={setIsOpen} onAfterClose={handleRemoveTaskOnClose}>
      <CSSReset>
        <Box vertical maxWidth={400} gap={24}>
          <Box vertical gap={12}>
            <Title>{modalContent.title}</Title>
            <Description>{modalContent.description}</Description>
          </Box>
          <Box vertical gap={12}>
            {Object.entries(modalContent.details).map(([key, value]) => (
              <Box key={key} vertical gap={4}>
                <ParamsKey>{key}:</ParamsKey>
                <ParamsContainer data-scrollable>{value}</ParamsContainer>
              </Box>
            ))}
          </Box>
          <Box fullWidth gap={8}>
            <Button fullWidth intent="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button fullWidth onClick={handleConfirm}>
              Confirm
            </Button>
          </Box>
        </Box>
      </CSSReset>
      <CloseButton onClick={closeModal} />
    </FlexModal>
  );
}
