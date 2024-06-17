import { UUID } from "../models/UUID";
export interface CreateUserInput {
    uniqueId: UUID;
    username: string;
}
