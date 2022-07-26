import { ContextSet } from "./ContextSet";

export interface NewNode {
    key: string,
    value?: boolean,
    context?: ContextSet,
    expiry?: Number
}