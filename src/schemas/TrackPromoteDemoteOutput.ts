export interface TrackPromoteDemoteOutput {
    success: boolean,
    status: "success" | "added_to_first_group" | "malformed_track" | "end_of_track" | "ambiguous_call" | "undefined_failure",
    groupFrom?: string,
    groupTo?: string
}