/// <reference types="react" />
import { ITranslation } from "./ITranslation";
import { IContextDef } from "./IContextDef";
export interface IPageDef<TSlotType extends string | number, TContext> {
    contextType: Record<keyof TContext, "number" | "string">;
    paths: Record<string, IContextDef<any, TContext> | ((params: Record<string, string>) => TContext | string | undefined)>;
    isPrivacyPolicy?: boolean;
    hasSidebar?: boolean;
    getPageTemplate(): React.ComponentType<IPageTemplateProps<TSlotType>> | Promise<React.ComponentType<IPageTemplateProps<TSlotType>>>;
    getErrorPlaceholder?(props: IPageTemplateProps<TSlotType>): JSX.Element;
    getLoadingPlaceholder?(props: IPageTemplateProps<TSlotType>): JSX.Element;
    buildCanonicalUrl?(params: TContext): string;
}
export interface IPageTemplateProps<TSlotType extends string | number> {
    translation: ITranslation;
    sidebarVisible: boolean;
    slots: Record<TSlotType, JSX.Element[]>;
    /** The configuration object that was passed together with the page URI in the initial CMS "pages" config */
    options?: unknown;
}
