import { EventEmitter } from 'eventemitter3';
import { v4 as uuidv4 } from 'uuid';

import { Deferred } from './Defer';

enum AsyncTaskManagerEvent {
  TaskCreated = 'task:created',
  TaskResolved = 'task:resolved',
  TaskRejected = 'task:rejected',
}

interface AsyncTaskEventMap<
  OperationType extends string,
  OperationParamsMap extends Record<OperationType, unknown>,
  OperationResultMap extends Record<OperationType, unknown>,
> {
  [AsyncTaskManagerEvent.TaskCreated]: {
    taskId: string;
    operationType: OperationType;
    params?: OperationParamsMap[OperationType];
  };
  [AsyncTaskManagerEvent.TaskResolved]: {
    taskId: string;
    operationType: OperationType;
    result?: OperationResultMap[OperationType];
  };
  [AsyncTaskManagerEvent.TaskRejected]: {
    taskId: string;
    operationType: OperationType;
    error: Error;
  };
}

export class AsyncTaskManager<
  OperationType extends string,
  OperationParamsMap extends Record<OperationType, unknown>,
  OperationResultMap extends Record<OperationType, unknown>,
> extends EventEmitter<AsyncTaskEventMap<OperationType, OperationParamsMap, OperationResultMap>> {
  private readonly activeTasks = new Map<
    string,
    {
      deferred: Deferred<OperationResultMap[OperationType]>;
      operationType: OperationType;
      params?: OperationParamsMap[OperationType];
    }
  >();

  createTask({ operationType, params }: { operationType: OperationType; params?: OperationParamsMap[OperationType] }) {
    const taskId = this.generateTaskId();
    const deferred = new Deferred<OperationResultMap[OperationType]>();

    this.activeTasks.set(taskId, {
      deferred,
      operationType,
      params,
    });

    this.emit(AsyncTaskManagerEvent.TaskCreated, {
      taskId,
      operationType,
      params,
    });

    return deferred.promise;
  }

  resolveTask(taskId: string, result?: OperationResultMap[OperationType]) {
    const task = this.activeTasks.get(taskId);
    if (!task) return;

    task.deferred.resolve(result);
    this.activeTasks.delete(taskId);

    this.emit(AsyncTaskManagerEvent.TaskResolved, {
      taskId,
      operationType: task.operationType,
      result,
    });
  }

  rejectTask(taskId: string, error: Error) {
    const task = this.activeTasks.get(taskId);
    if (!task) return;

    task.deferred.reject(error);
    this.activeTasks.delete(taskId);

    this.emit(AsyncTaskManagerEvent.TaskRejected, {
      taskId,
      operationType: task.operationType,
      error,
    });
  }

  onTaskCreated(
    listener: (
      payload: AsyncTaskEventMap<
        OperationType,
        OperationParamsMap,
        OperationResultMap
      >[AsyncTaskManagerEvent.TaskCreated],
    ) => void,
  ) {
    this.on(AsyncTaskManagerEvent.TaskCreated, listener);
    return () => this.off(AsyncTaskManagerEvent.TaskCreated, listener);
  }

  onTaskResolved(
    listener: (
      payload: AsyncTaskEventMap<
        OperationType,
        OperationParamsMap,
        OperationResultMap
      >[AsyncTaskManagerEvent.TaskResolved],
    ) => void,
  ) {
    this.on(AsyncTaskManagerEvent.TaskResolved, listener);
    return () => this.off(AsyncTaskManagerEvent.TaskResolved, listener);
  }

  onTaskRejected(
    listener: (
      payload: AsyncTaskEventMap<
        OperationType,
        OperationParamsMap,
        OperationResultMap
      >[AsyncTaskManagerEvent.TaskRejected],
    ) => void,
  ) {
    this.on(AsyncTaskManagerEvent.TaskRejected, listener);
    return () => this.off(AsyncTaskManagerEvent.TaskRejected, listener);
  }

  cancelTask(taskId: string, reason: Error = new Error('Task cancelled')): boolean {
    if (!this.activeTasks.has(taskId)) return false;
    this.rejectTask(taskId, reason);
    return true;
  }

  private generateTaskId() {
    return uuidv4();
  }
}
