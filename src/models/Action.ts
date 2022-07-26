import { UUID } from "./UUID";

interface ActionSource {
    uniqueId: UUID,
    name: string
}

interface ActionTarget extends ActionSource {
    type: "user" | "group" | "track"
}

export interface Action {
    timestamp?: Number,
    source: ActionSource,
    target: ActionTarget,
    description: string
}