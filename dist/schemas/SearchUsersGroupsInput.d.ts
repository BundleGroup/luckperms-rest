import { NodeType } from "../models/Node";
export interface SearchUsersGroupsInput {
    key?: string;
    keyStartsWith?: string;
    metaKey?: string;
    type?: NodeType;
}
