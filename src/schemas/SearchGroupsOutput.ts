import { NodeMap } from "../models/NodeMap";

interface UserSearchResult {
    name: string,
    results: NodeMap
}

export type SearchGroupsOutput = UserSearchResult[];