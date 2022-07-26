import { LuckpermsRestClient } from "./LuckpermsRestClient";
import { User } from "./models/User";
import { UUID } from "./models/UUID";
import { CreateUserInput } from "./schemas/CreateUserInput";
import { SearchUsersInput } from "./schemas/SearchUsersInput";
import { SearchUsersOutput } from "./schemas/SearchUsersOutput";
import { UpdateUserInput } from "./schemas/UpdateUserInput";

export class LuckpermsClient extends LuckpermsRestClient {
    async getUsers(): Promise<UUID[]> {
        return await this.get("/user");
    }

    async createUser(details: CreateUserInput): Promise<User> {
        return await this.post("/user", details);
    }

    async searchUsers(query: SearchUsersInput): Promise<SearchUsersOutput> {
        // TODO: Clean this up - typescript isn't happy with directly passing query
        return await this.get("/user/search", {
            key: query.key,
            keyStartsWith: query.keyStartsWith,
            metaKey: query.metaKey,
            type: query.type
        });
    }

    async getUser(uuid: UUID): Promise<User> {
        return await this.get(`/user/${uuid}`);
    }

    async updateUser(uuid: UUID, update: UpdateUserInput): Promise<void> {
        return await this.patch(`/user/${uuid}`, update);
    }
}