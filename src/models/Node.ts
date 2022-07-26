import { ContextSet } from "./ContextSet";

export type NodeType = "permission" | "regex_permission" | "inheritance" | "prefix" | "suffix" | "meta" | "weight" | "display_name";

export interface Node {
    key: string,
    type: NodeType,
    value: boolean,
    context: ContextSet,
    expiry: Number
}