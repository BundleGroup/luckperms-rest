import { Metadata } from "./Metadata";
import { NodeMap } from "./NodeMap";
export interface Group {
    name: string;
    displayName?: string;
    weight?: Number;
    nodes: NodeMap;
    metadata: Metadata;
}
