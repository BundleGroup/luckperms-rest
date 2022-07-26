import { Node } from "../models/Node";

export interface RunPermissionCheckOutput {
    result: "true" | "false" | "undefined",
    node: Node
}