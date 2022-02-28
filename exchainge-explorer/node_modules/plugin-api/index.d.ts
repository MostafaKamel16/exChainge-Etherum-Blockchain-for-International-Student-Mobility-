import { IPluginManifest } from "./IPluginManifest";

export * from "./IAsyncData";
export * from "./IContentProps";
export * from "./IContextDef";
export * from "./IDataAdapter";
export * from "./IDataAdapterConfig";
export * from "./IDataSource";
export * from "./IDataWatcher";
export * from "./ILiveContentProps";
export * from "./ILogger";
export * from "./IModuleDef";
export * from "./IModuleInlineDef";
export * from "./IPageDef";
export * from "./IPlugin";
export * from "./IPluginApi";
export * from "./ITranslation";
export * from "./LoadStatus";
export * from "./IPluginManifest";

declare global {
    /**
     * The manifest for this plugin (available only in plugin code as a webpack pre-processed variable)
     */
    export const __plugin_manifest__: IPluginManifest;
}
