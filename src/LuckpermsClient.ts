import { LuckpermsClientOptions, LuckpermsRestClient } from "./LuckpermsRestClient";
import { Action } from "./models/Action";
import { Group } from "./models/Group";
import { Metadata } from "./models/Metadata";
import { NewNode } from "./models/NewNode";
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

export class LuckpermsClient {
    restClient: LuckpermsRestClient;

    constructor (options: LuckpermsClientOptions) {
        this.restClient = new LuckpermsRestClient(options);
    }

    /**
     * Returns an array of all known users. 
     */
    async getUsers(): Promise<UUID[]> {
        return await this.restClient.get("/user");
    }

    /**
     * Create a new user.
     * @param details Parameters of the user that should be created
     */
    async createUser(details: CreateUserInput): Promise<User> {
        return await this.restClient.post("/user", details);
    }

    /**
     * Search for users with given nodes.
     *
     * You must specify one of the query parameters in the request.
     * @param query Search query
     */
    async searchUsers(query: SearchUsersGroupsInput): Promise<SearchUsersOutput> {
        // TODO: Clean this up - typescript isn't happy with directly passing query
        return await this.restClient.get("/user/search", {
            key: query.key,
            keyStartsWith: query.keyStartsWith,
            metaKey: query.metaKey,
            type: query.type
        });
    }

    /**
     * Get a user by unique id (UUID).
     * @param uuid UUID of user to retrieve
     */
    async getUser(uuid: UUID): Promise<User> {
        return await this.restClient.get(`/user/${uuid}`);
    }

    /**
     * Update a user's data
     * @param uuid UUID of user to update
     * @param update User's new details
     */
    async updateUser(uuid: UUID, update: UpdateUserInput): Promise<void> {
        return await this.restClient.patch(`/user/${uuid}`, update);
    }

    /**
     * Delete a user
     * @param uuid UUID of user to delete
     */
    async deleteUser(uuid: UUID): Promise<void> {
        return await this.restClient.delete(`/user/${uuid}`);
    }

    /**
     * Get a users nodes.
     * @param uuid UUID of user to fetch
     */
    async getUserNodes(uuid: UUID): Promise<NodeMap> {
        return await this.restClient.get(`/user/${uuid}/nodes`);
    }

    /**
     * Add a single node to the user
     * @param uuid UUID of user to add node to
     * @param node Permission node to add
     */
    async addUserNode(uuid: UUID, node: NewNode): Promise<NodeMap> {
        return await this.restClient.post(`/user/${uuid}/nodes`, node);
    }

    /**
     * Add multiple nodes to the user
     * @param uuid UUID of user to add node to
     * @param nodes Permission nodes to add
     */
    async addUserNodes(uuid: UUID, nodes: NewNode[]): Promise<NodeMap> {
        return await this.restClient.patch(`/user/${uuid}/nodes`, nodes);
    }

    /**
     * Override the users nodes
     * @param uuid UUID of user to replace nodes of
     * @param nodes Permission nodes to set
     */
    async replaceUserNodes(uuid: UUID, nodes: NewNode[]): Promise<NodeMap> {
        return await this.restClient.put(`/user/${uuid}/nodes`, nodes);
    }

    /**
     * Delete some or all of the nodes from a user.
     * @param uuid UUID of user to delete nodes from
     * @param nodes Nodes to delete
     */
    async deleteUserNodes(uuid: UUID, nodes: NewNode[]): Promise<void> {
        return await this.restClient.delete(`/user/${uuid}/nodes`, nodes);
    }

    /**
     * Get a users metadata
     * @param uuid UUID of user to fetch metadata for
     */
    async getUserMetadata(uuid: UUID): Promise<Metadata> {
        return await this.restClient.get(`/user/${uuid}/metadata`);
    }

    /**
     * Run a permission check against a user
     * @param uuid UUID of user
     * @param permission The permission to check for
     */
    async runUserPermissionCheck(uuid: UUID, permission: string): Promise<RunPermissionCheckOutput> {
        return await this.restClient.get(`/user/${uuid}/permissionCheck`, {
            permission
        });
    }

    /**
     * Run a permission check against a user with custom query options
     * @param uuid UUID of user
     * @param options Permission check parameters
     */
    async runCustomUserPermissionCheck(uuid: UUID, options: RunCustomPermissionCheckInput): Promise<RunPermissionCheckOutput> {
        return await this.restClient.post(`/user/${uuid}/permissionCheck`, options);
    }

    /**
     * Promote a user along a track
     * @param uuid UUID of user to promote
     * @param trackRequest Details of which track to promote them to
     */
    async promoteUser(uuid: UUID, trackRequest: TrackPromoteDemoteInput): Promise<TrackPromoteDemoteOutput> {
        return await this.restClient.post(`/user/${uuid}/promote`, trackRequest);
    }

    /**
     * Demote a user along a track
     * @param uuid UUID of user to demote
     * @param trackRequest Details of which track to demote them to
     */
    async demoteUser(uuid: UUID, trackRequest: TrackPromoteDemoteInput): Promise<TrackPromoteDemoteOutput> {
        return await this.restClient.post(`/user/${uuid}/demote`, trackRequest);
    }

    /**
     * Get all known groups
     */
    async getGroups(): Promise<string> {
        return await this.restClient.get("/group");
    }

    /**
     * Create a new group.
     * @param name Name of group to create
     */
    async createGroup(name: string): Promise<string> {
        return await this.restClient.post("/group", {
            name
        });
    }

    /**
     * Search for groups with given nodes.
     * 
     * You must specify one of the query parameters in the request.
     * @param query Search parameters
     */
    async searchGroups(query: SearchUsersGroupsInput): Promise<SearchGroupsOutput> {
        // TODO: Clean this up - typescript isn't happy with directly passing query
        return await this.restClient.get("/group/search", {
            key: query.key,
            keyStartsWith: query.keyStartsWith,
            metaKey: query.metaKey,
            type: query.type
        });
    }

    /**
     * Get a group
     * @param group Group to fetch
     */
    async getGroup(group: string): Promise<Group> {
        return await this.restClient.get(`/group/${group}`);
    }

    /**
     * Delete a group
     * @param group Group to delete
     */
    async deleteGroup(group: string): Promise<void> {
        return await this.restClient.delete(`/group/${group}`);
    }

    /**
     * Get a groups nodes.
     * @param group Group to fetch
     */
    async getGroupNodes(group: string): Promise<NodeMap> {
        return await this.restClient.get(`/group/${group}/nodes`);
    }

    /**
     * Add a single node to the group
     * @param group Group to add node to
     * @param node Permission node to add
     */
    async addGroupNode(group: string, node: NewNode): Promise<NodeMap> {
        return await this.restClient.post(`/group/${group}/nodes`, node);
    }

    /**
     * Add multiple nodes to the group
     * @param group Group to add nodes to
     * @param nodes Permission nodes to add
     */
    async addGroupNodes(group: string, nodes: NewNode[]): Promise<NodeMap> {
        return await this.restClient.patch(`/group/${group}/nodes`, nodes);
    }

    /**
     * Override the groups nodes
     * @param group Group to override nodes for
     * @param nodes Nodes to set
     */
    async replaceGroupNodes(group: string, nodes: NewNode[]): Promise<NodeMap> {
        return await this.restClient.put(`/group/${group}/nodes`, nodes);
    }

    /**
     * Delete some or all of the nodes from a group.
     * 
     * If the request body is empty, all nodes will be deleted.
     * @param group Group to delete nodes from
     * @param nodes Nodes to delete
     */
    async deleteGroupNodes(group: string, nodes: NewNode[]): Promise<void> {
        return await this.restClient.delete(`/group/${group}/nodes`, nodes);
    }

    /**
     * Get the groups metadata
     * @param group Group to fetch
     */
    async getGroupMetadata(group: string): Promise<Metadata> {
        return await this.restClient.get(`/group/${group}/metadata`);
    }

    /**
     * Run a permission check against a group
     * @param group Group to run check for
     * @param permission Permission to check against
     */
    async runGroupPermissionCheck(group: string, permission: string): Promise<RunPermissionCheckOutput> {
        return await this.restClient.get(`/user/${group}/permissionCheck`, {
            permission
        });
    }

    /**
     * Run a permission check against a group with custom query options
     * @param group Group to run check for
     * @param options Permission(s) to check against
     */
    async runCustomGroupPermissionCheck(group: string, options: RunCustomPermissionCheckInput): Promise<RunPermissionCheckOutput> {
        return await this.restClient.post(`/group/${group}/permissionCheck`, options);
    }

    /**
     * Submit a new action to the action logger.
     * @param action The action to be submitted
     */
    async submitAction(action: Action): Promise<void> {
        return await this.restClient.post(`/action`, action);
    }
}