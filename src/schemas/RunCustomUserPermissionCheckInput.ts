import { QueryOptions } from "../models/QueryOptions";

export interface RunCustomUserPermissionCheckInput {
    permission: string,
    queryOptions?: QueryOptions
}