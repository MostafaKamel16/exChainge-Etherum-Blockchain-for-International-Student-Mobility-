import { IDataWatcher } from "../IDataWatcher";
import { IEvent } from "@puzzl/core/lib/event/EventDispatcher";
export declare class EventWatcher<T> implements IDataWatcher {
    private event;
    private predicate;
    private _onData;
    readonly onData: IEvent<void, void>;
    constructor(event: IEvent<unknown, T>, predicate: (evData: T) => boolean);
    watch(): void;
    unwatch(): void;
    private onEvent;
}
