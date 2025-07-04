import { TABLE_HEADER_ACTIONS } from "@ITSA-Nucleo/itsa-fe-components";
import { ReactElement } from "react";

export interface ISecurityModuleResponse {
	code: number;
	message: string;
	result: ISecurityModuleResult[];
}

export interface ISecurityModuleResult {
	id: number;
	nombre: string;
	[TABLE_HEADER_ACTIONS]: ReactElement;
}
