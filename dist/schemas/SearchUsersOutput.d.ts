import { NodeMap } from "../models/NodeMap";
import { UUID } from "../models/UUID";
interface UserSearchResult {
    uniqueId: UUID;
    results: NodeMap;
}
export declare type SearchUsersOutput = UserSearchResult[];
export {};
