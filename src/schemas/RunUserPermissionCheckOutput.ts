import { Node } from "../models/Node";

export interface RunUserPermissionCheckOutput {
    result: "true" | "false" | "undefined",
    node: Node
}