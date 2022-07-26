import { NodeType } from "../models/Node";

export interface SearchUsersInput {
    key?: string,
    keyStartsWith?: string,
    metaKey?: string,
    type?: NodeType
}