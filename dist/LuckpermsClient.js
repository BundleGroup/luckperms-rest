import { LuckpermsRestClient } from "./LuckpermsRestClient";
export class LuckpermsClient {
    restClient;
    constructor(options) {
        this.restClient = new LuckpermsRestClient(options);
    }
    async getUsers() {
        return await this.restClient.get("/user");
    }
    async createUser(details) {
        return await this.restClient.post("/user", details);
    }
    async searchUsers(query) {
        return await this.restClient.get("/user/search", {
            key: query.key,
            keyStartsWith: query.keyStartsWith,
            metaKey: query.metaKey,
            type: query.type
        });
    }
    async getUser(uuid) {
        return await this.restClient.get(`/user/${uuid}`);
    }
    async updateUser(uuid, update) {
        return await this.restClient.patch(`/user/${uuid}`, update);
    }
    async deleteUser(uuid) {
        return await this.restClient.delete(`/user/${uuid}`);
    }
    async getUserNodes(uuid) {
        return await this.restClient.get(`/user/${uuid}/nodes`);
    }
    async addUserNode(uuid, node) {
        return await this.restClient.post(`/user/${uuid}/nodes`, node);
    }
    async addUserNodes(uuid, nodes) {
        return await this.restClient.patch(`/user/${uuid}/nodes`, nodes);
    }
    async replaceUserNodes(uuid, nodes) {
        return await this.restClient.put(`/user/${uuid}/nodes`, nodes);
    }
    async deleteUserNodes(uuid, nodes) {
        return await this.restClient.delete(`/user/${uuid}/nodes`, nodes);
    }
    async getUserMetadata(uuid) {
        return await this.restClient.get(`/user/${uuid}/metadata`);
    }
    async runUserPermissionCheck(uuid, permission) {
        return await this.restClient.get(`/user/${uuid}/permissionCheck`, {
            permission
        });
    }
    async runCustomUserPermissionCheck(uuid, options) {
        return await this.restClient.post(`/user/${uuid}/permissionCheck`, options);
    }
    async promoteUser(uuid, trackRequest) {
        return await this.restClient.post(`/user/${uuid}/promote`, trackRequest);
    }
    async demoteUser(uuid, trackRequest) {
        return await this.restClient.post(`/user/${uuid}/demote`, trackRequest);
    }
    async getGroups() {
        return await this.restClient.get("/group");
    }
    async createGroup(name) {
        return await this.restClient.post("/group", {
            name
        });
    }
    async searchGroups(query) {
        return await this.restClient.get("/group/search", {
            key: query.key,
            keyStartsWith: query.keyStartsWith,
            metaKey: query.metaKey,
            type: query.type
        });
    }
    async getGroup(group) {
        return await this.restClient.get(`/group/${group}`);
    }
    async deleteGroup(group) {
        return await this.restClient.delete(`/group/${group}`);
    }
    async getGroupNodes(group) {
        return await this.restClient.get(`/group/${group}/nodes`);
    }
    async addGroupNode(group, node) {
        return await this.restClient.post(`/group/${group}/nodes`, node);
    }
    async addGroupNodes(group, nodes) {
        return await this.restClient.patch(`/group/${group}/nodes`, nodes);
    }
    async replaceGroupNodes(group, nodes) {
        return await this.restClient.put(`/group/${group}/nodes`, nodes);
    }
    async deleteGroupNodes(group, nodes) {
        return await this.restClient.delete(`/group/${group}/nodes`, nodes);
    }
    async getGroupMetadata(group) {
        return await this.restClient.get(`/group/${group}/metadata`);
    }
    async runGroupPermissionCheck(group, permission) {
        return await this.restClient.get(`/user/${group}/permissionCheck`, {
            permission
        });
    }
    async runCustomGroupPermissionCheck(group, options) {
        return await this.restClient.post(`/group/${group}/permissionCheck`, options);
    }
    async submitAction(action) {
        return await this.restClient.post(`/action`, action);
    }
}
