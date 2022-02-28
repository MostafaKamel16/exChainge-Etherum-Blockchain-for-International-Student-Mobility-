import { IDataWatcher } from "../IDataWatcher";
export declare class ObservableWatcher implements IDataWatcher {
    private expression;
    private throttleSeconds;
    private refreshDisposer;
    private lastEventTime;
    private dataRefreshEvent;
    constructor(expression: () => any, throttleSeconds?: number);
    readonly onData: import("@puzzl/core/lib/event/EventDispatcher").IEvent<void, void>;
    watch(): void;
    unwatch(): void;
}
