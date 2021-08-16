export interface PromiseResolver<T> {
    (value: T): void;
}

export interface Supplier<T> {
    (): T
}