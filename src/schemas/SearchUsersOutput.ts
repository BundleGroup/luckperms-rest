import { NodeMap } from "../models/NodeMap";
import { UUID } from "../models/UUID";

interface UserSearchResult {
    uniqueId: UUID,
    results: NodeMap
}

export type SearchUsersOutput = UserSearchResult[];