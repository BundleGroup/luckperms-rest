import { Metadata } from "./Metadata";
import { NodeMap } from "./NodeMap";
import { UUID } from "./UUID";
export interface User {
    uniqueId: UUID;
    username: string;
    parentGroups: string[];
    nodes: NodeMap;
    metadata: Metadata;
}
