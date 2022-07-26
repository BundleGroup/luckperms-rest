import { LuckpermsRestClient } from "./LuckpermsRestClient";
import { Metadata } from "./models/Metadata";
import { NewNode } from "./models/NewNode";
import { Node } from "./models/Node";
import { NodeMap } from "./models/NodeMap";
import { User } from "./models/User";
import { UUID } from "./models/UUID";
import { CreateUserInput } from "./schemas/CreateUserInput";
import { RunCustomUserPermissionCheckInput } from "./schemas/RunCustomUserPermissionCheckInput";
import { RunUserPermissionCheckOutput } from "./schemas/RunUserPermissionCheckOutput";
import { SearchUsersInput } from "./schemas/SearchUsersInput";
import { SearchUsersOutput } from "./schemas/SearchUsersOutput";
import { TrackPromoteDemoteInput } from "./schemas/TrackPromoteDemoteInput";
import { TrackPromoteDemoteOutput } from "./schemas/TrackPromoteDemoteOutput";
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

    async deleteUser(uuid: UUID): Promise<void> {
        return await this.delete(`/user/${uuid}`);
    }

    async getUserNodes(uuid: UUID): Promise<NodeMap> {
        return await this.get(`/user/${uuid}/nodes`);
    }

    async addUserNode(uuid: UUID, node: NewNode): Promise<NodeMap> {
        return await this.post(`/user/${uuid}/nodes`, node);
    }

    async addUserNodes(uuid: UUID, nodes: NewNode[]): Promise<NodeMap> {
        return await this.patch(`/user/${uuid}/nodes`, nodes);
    }

    async replaceUserNodes(uuid: UUID, nodes: NewNode[]): Promise<NodeMap> {
        return await this.put(`/user/${uuid}/nodes`, nodes);
    }

    async deleteUserNodes(uuid: UUID, nodes: NewNode[]): Promise<void> {
        return await this.delete(`/user/${uuid}/nodes`, nodes);
    }

    async getUserMetadata(uuid: UUID): Promise<Metadata> {
        return await this.get(`/user/${uuid}/metadata`);
    }

    async runUserPermissionCheck(uuid: UUID, permission: string): Promise<RunUserPermissionCheckOutput> {
        return await this.get(`/user/${uuid}/permissionCheck`, {
            permission
        });
    }

    async runCustomUserPermissionCheck(uuid: UUID, options: RunCustomUserPermissionCheckInput): Promise<RunUserPermissionCheckOutput> {
        return await this.post(`/user/${uuid}/permissionCheck`, options);
    }

    async promoteUser(uuid: UUID, trackRequest: TrackPromoteDemoteInput): Promise<TrackPromoteDemoteOutput> {
        return await this.post(`/user/${uuid}/promote`, trackRequest);
    }

    async demoteUser(uuid: UUID, trackRequest: TrackPromoteDemoteInput): Promise<TrackPromoteDemoteOutput> {
        return await this.post(`/user/${uuid}/demote`, trackRequest);
    }
}