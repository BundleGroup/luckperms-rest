import { ContextSet } from "./ContextSet";
declare type QueryFlags = "resolve_inheritance" | "include_nodes_without_server_context" | "include_nodes_without_world_context" | "apply_inheritance_nodes_without_server_context" | "apply_inheritance_nodes_without_world_context";
export interface QueryOptions {
    mode?: "contextual" | "non_contextual";
    flags?: QueryFlags;
    contexts?: ContextSet;
}
export {};
