export interface EventBus<
    T extends { type: string; data: unknown } = { type: string; data: unknown },
> {
    push(event: T): void;
    subscribe(event: T['type'], listener: (event: T) => void): void;
}
