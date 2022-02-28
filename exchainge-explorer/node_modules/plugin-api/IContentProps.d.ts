import { ITranslation } from "./ITranslation";
import { ILogger } from "./ILogger";
export interface IContentProps<TContext = {}, TSlotType = undefined> {
    context: TContext;
    translation: ITranslation;
    locale: string;
    logger: ILogger;
    /** An object that is persisted globally until a page refresh, which can be used to store/share ui state */
    uiStateContainer: {};
    sidebarVisible: boolean;
    slots: TSlotType extends string | number ? Record<TSlotType, JSX.Element[]> | undefined : undefined;
    /** The configuration object that was passed together with the module URI in the initial CMS pages structure config */
    options?: unknown;
}
