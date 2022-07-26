import { NewNode } from "./NewNode";

export type NodeType = "permission" | "regex_permission" | "inheritance" | "prefix" | "suffix" | "meta" | "weight" | "display_name";

export interface Node extends NewNode {
    type: NodeType
}