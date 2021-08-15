import { Pool } from 'pg';
import logger from '../utils/logger';
import createPool from './db-loader';

export type PoolTaskCallerType = 'ready' | 'default';

export interface PoolTask {
    (pool: Pool, callerType: PoolTaskCallerType): void;
}

// These are the tasks that will run right when the 
// pool is ready.
var onReadyScheduledTasks = new Array<PoolTask>();
var pool: Pool | undefined = undefined;

export async function runReadyScheduledTasks() {
    if (!pool)
        logger.error("The pool is not ready to run the onReadyScheduled tasks.")
    else {
        onReadyScheduledTasks.forEach(async task => 
            await executePoolTask(task, 'ready'));
        onReadyScheduledTasks = [];
    }
}

// Try not to use this as there is no guarantee this schedule runs 
// before when the pool is ready.
export function scheduleOnReadyPoolTask(task: PoolTask) {
    onReadyScheduledTasks.push(task);
}

async function executePoolTask(poolTask: PoolTask, callerType: PoolTaskCallerType = 'default') {
    poolTask((pool as Pool), callerType);
}

/** 
 * Run this instead of accessing the pool object 
 * directly as this guarantees the task runs without
 * any race conditions.
 *
 * This also forces the task to run asynchronously. 
 */
export function schedulePoolTask(task: PoolTask) {
    if (isPoolReady()) {
        executePoolTask(task);
    } else {
        scheduleOnReadyPoolTask(task);
    }
}

export function isPoolReady(): boolean {
    return (pool) ? true : false;
}

createPool().then(async (createdPool) => {
    pool = createdPool;
    const tasks = onReadyScheduledTasks.length;
    logger.load(`Loading on ready scheduled tasks (DB). Loading a total of ${tasks} tasks.`);
    await runReadyScheduledTasks();
    logger.success(`Loaded all scheduled tasks ${tasks}.`);
});
