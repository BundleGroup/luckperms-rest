import { NewNode } from "./NewNode";
export declare type NodeType = "permission" | "regex_permission" | "inheritance" | "prefix" | "suffix" | "meta" | "weight" | "display_name";
export interface Node extends NewNode {
    type: NodeType;
}
