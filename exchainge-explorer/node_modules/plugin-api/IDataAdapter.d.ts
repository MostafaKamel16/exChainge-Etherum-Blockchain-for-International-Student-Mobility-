import { IDataWatcher } from "./IDataWatcher";
import { CancellationToken } from "@puzzl/core/lib/async/cancellation";
import { IDataAdapterRefConfig } from "./IDataAdapterConfig";
import { IAsyncData } from "./IAsyncData";

export interface IDataAdapter<TContext, TData> {
    contextType: Record<keyof TContext, "number" | "string">;
    /**
     * Dependencies on other data adapters. Adapters identified by these URIs will be loaded before this adapter
     * and their results passed as a parameter to the load method
     */
    dependencies?: string[];
    /**
     * @param context
     * @param cancellationToken
     * @param depData Loaded adapter dependencies. This is a map of adapter URIs to returned data.
     */
    load(context: TContext, cancellationToken: CancellationToken, depData: Map<string, unknown>): Promise<TData | undefined>;
    createWatcher?(context: TContext, lastData: TData | undefined): IDataWatcher | IDataWatcher[];
}
