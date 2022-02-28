import React from "react";
import { IModuleInlineDef } from "../IModuleInlineDef";
import { ILogger } from "../ILogger";

export interface IInlineModuleProps<TContext, TContentProps, TExtraProps> {
    context: TContext;
    moduleDef: IModuleInlineDef<TContentProps, TContext, TExtraProps>;
    logger: ILogger;
    extraContentProps?: TExtraProps;
}

export class InlineModule<TContext, TContentProps, TExtraProps>
extends React.Component<IInlineModuleProps<TContext, TContentProps, TExtraProps>> {

}
