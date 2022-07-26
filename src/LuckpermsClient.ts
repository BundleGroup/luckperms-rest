import { LuckpermsRestClient } from "./LuckpermsRestClient";
import { Action } from "./models/Action";
import { Metadata } from "./models/Metadata";
import { NewNode } from "./models/NewNode";
import { Node } from "./models/Node";
import { NodeMap } from "./models/NodeMap";
import { User } from "./models/User";
import { UUID } from "./models/UUID";
import { CreateUserInput } from "./schemas/CreateUserInput";
import { RunCustomPermissionCheckInput } from "./schemas/RunCustomPermissionCheckInput";
import { RunPermissionCheckOutput } from "./schemas/RunPermissionCheckOutput";
import { SearchGroupsOutput } from "./schemas/SearchGroupsOutput";
import { SearchUsersGroupsInput } from "./schemas/SearchUsersGroupsInput";
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

    async searchUsers(query: SearchUsersGroupsInput): Promise<SearchUsersOutput> {
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

    async runUserPermissionCheck(uuid: UUID, permission: string): Promise<RunPermissionCheckOutput> {
        return await this.get(`/user/${uuid}/permissionCheck`, {
            permission
        });
    }

    async runCustomUserPermissionCheck(uuid: UUID, options: RunCustomPermissionCheckInput): Promise<RunPermissionCheckOutput> {
        return await this.post(`/user/${uuid}/permissionCheck`, options);
    }

    async promoteUser(uuid: UUID, trackRequest: TrackPromoteDemoteInput): Promise<TrackPromoteDemoteOutput> {
        return await this.post(`/user/${uuid}/promote`, trackRequest);
    }

    async demoteUser(uuid: UUID, trackRequest: TrackPromoteDemoteInput): Promise<TrackPromoteDemoteOutput> {
        return await this.post(`/user/${uuid}/demote`, trackRequest);
    }

    async getGroups(): Promise<string> {
        return await this.get("/group");
    }

    async createGroup(name: string): Promise<string> {
        return await this.post("/group", {
            name
        });
    }

    async searchGroups(query: SearchUsersGroupsInput): Promise<SearchGroupsOutput> {
        // TODO: Clean this up - typescript isn't happy with directly passing query
        return await this.get("/group/search", {
            key: query.key,
            keyStartsWith: query.keyStartsWith,
            metaKey: query.metaKey,
            type: query.type
        });
    }

    async deleteGroup(group: string): Promise<void> {
        return await this.delete(`/group/${group}`);
    }

    async getGroupNodes(group: string): Promise<NodeMap> {
        return await this.get(`/group/${group}/nodes`);
    }

    async addGroupNode(group: string, node: NewNode): Promise<NodeMap> {
        return await this.post(`/group/${group}/nodes`, node);
    }

    async addGroupNodes(group: string, nodes: NewNode[]): Promise<NodeMap> {
        return await this.patch(`/group/${group}/nodes`, nodes);
    }

    async replaceGroupNodes(group: string, nodes: NewNode[]): Promise<NodeMap> {
        return await this.put(`/group/${group}/nodes`, nodes);
    }

    async deleteGroupNodes(group: string, nodes: NewNode[]): Promise<void> {
        return await this.delete(`/group/${group}/nodes`, nodes);
    }

    async getGroupMetadata(group: string): Promise<Metadata> {
        return await this.get(`/group/${group}/metadata`);
    }

    async runGroupPermissionCheck(group: string, permission: string): Promise<RunPermissionCheckOutput> {
        return await this.get(`/user/${group}/permissionCheck`, {
            permission
        });
    }

    async runCustomGroupPermissionCheck(group: string, options: RunCustomPermissionCheckInput): Promise<RunPermissionCheckOutput> {
        return await this.post(`/group/${group}/permissionCheck`, options);
    }

    async submitAction(action: Action): Promise<void> {
        return await this.post(`/action`, action);
    }
}