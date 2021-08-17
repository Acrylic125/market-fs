import { assert } from 'console';
import { PromiseResolver, Supplier } from '../utils/functional';
import logger, { DEFAULT_LOGGABLE_OPTIONS, LoggableOptions } from '../utils/logger';
import { PRC_DEFAULT, PRC_READY, SchedulerTask, SchedulerTaskSource } from './scheduler-task';

export interface AsyncSchedulerTask<T> 
    extends SchedulerTask<T, SchedulerTaskSource> {}

// Safe Load states:
const SL_STARTED_LOADING = 0x01;
const SL_DONE_LOADING = 0x02;
const SL_SUCCESSFUL_LOADING = 0x04;

export default class AsyncSafeLoadScheduler<T> {

    private loadedValue: T | null = null;
    private state = 0;
    private onLoadedResolvers: Array<PromiseResolver<T>> = [];

    constructor(
        public id: string,
        private loaderSupplier: Supplier<T>,
        private loggableOptions: LoggableOptions = DEFAULT_LOGGABLE_OPTIONS
    ) {}

    private async loadResolvers() {
        assert(this.hasSuccessfullyLoaded(), `'${this.id}' Safe Async Loader loaded value has not been successfully loaded in! (Load Resolvers)`);
        this.onLoadedResolvers.forEach((resolve) => 
            resolve((this.loadedValue as T)));
        this.onLoadedResolvers = []; // Clear resolvers after loaded.
    }
    
    private async scheduleTaskOnLoadedValue(task: AsyncSchedulerTask<T>) {
        assert(this.hasSuccessfullyLoaded(), `'${this.id}' Safe Async Loader loaded value has not been successfully loaded in! (Default Task)`);
        task((this.loadedValue as T), PRC_DEFAULT);
    }

    public async scheduleTask(task: AsyncSchedulerTask<T>) {
        if (this.hasSuccessfullyLoaded()) {
            await this.scheduleTaskOnLoadedValue(task);
        } else {
            const promise = new Promise<T>((resolve, error) => 
                this.onLoadedResolvers.push(resolve));
            promise.then((value) => task(value, PRC_READY));
            await promise;
        }
    }

    private setState(state: number) {
        this.state = state;
    }

    // Do not use this unless YOU REALLY HAVE TO!
    public resetState() {
        this.setState(0);
    }

    private async loadLoaderSupplier() {
        var supplied = this.loaderSupplier();
        return supplied;
    }

    public async load() {
        var { id, loggableOptions } = this;
        if ((this.state & SL_STARTED_LOADING) === SL_STARTED_LOADING) {
            if (loggableOptions.logWarns)
                logger.warn(`'${id}' Async Safe Loader has already initiated a scheduled task.`);
        } else {
            this.state |= SL_STARTED_LOADING;
            if (loggableOptions.logLoad)
                logger.load(`Loading '${id}' Async Safe Loader.`);
            await this.loadLoaderSupplier()
                .then((val) => {
                    this.loadedValue = val;
                    this.state |= SL_SUCCESSFUL_LOADING;
                    this.loadResolvers();
                    if (loggableOptions.logSuccess)
                        logger.success(`'${id}' Async Safe Loader successfully loaded!`);
                })
                .catch((error) => {
                    if (loggableOptions.logErrors)
                        logger.error(error);
                }).finally(() => this.state |= SL_DONE_LOADING);
            
        }
    }

    public hasSuccessfullyLoaded(): boolean {
        return (this.state & SL_SUCCESSFUL_LOADING) === SL_SUCCESSFUL_LOADING;
    }

}

