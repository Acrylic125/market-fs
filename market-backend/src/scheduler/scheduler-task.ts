export interface SchedulerTaskSource {
    source: string;
}

export const PRC_DEFAULT: SchedulerTaskSource = {
    source: 'default'
}
export const PRC_READY: SchedulerTaskSource = {
    source: 'ready'
}

export interface SchedulerTask<T, S extends SchedulerTaskSource> {
    (val: T, source: S): void;
}

export interface SchedulerSupplier<V, T, S extends SchedulerTaskSource> {
    (val: T, source: S): V;
}