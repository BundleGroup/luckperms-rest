import axios from "axios";
import { APIKeyError } from "./errors/APIKeyError";
import { APIRequestError } from "./errors/APIRequestError";
export class LuckpermsRestClient {
    options;
    restClient;
    constructor(options) {
        this.options = options;
        this.restClient = axios.create({
            baseURL: this.options.url,
            headers: this.options.apiKey
                ? {
                    Authorization: `Bearer ${this.options.apiKey}`,
                }
                : {},
        });
    }
    async request(method, path, body, query) {
        try {
            let response = await this.restClient.request({
                method,
                headers: body
                    ? {
                        "Content-Type": "application/json",
                    }
                    : undefined,
                url: path,
                data: JSON.stringify(body),
                params: query,
            });
            return response.data;
        }
        catch (error) {
            if (error.response) {
                if (error.response.status === 401)
                    throw new APIKeyError(error.response.data);
                else
                    throw new APIRequestError(error.response.statusText);
            }
            else if (error.request) {
                throw new APIRequestError("No response received from the API");
            }
            else {
                throw error;
            }
        }
    }
    async get(path, query) {
        return await this.request("get", path, undefined, query);
    }
    async post(path, body) {
        return await this.request("post", path, body);
    }
    async put(path, body) {
        return await this.request("put", path, body);
    }
    async patch(path, body) {
        return await this.request("patch", path, body);
    }
    async delete(path, body) {
        return await this.request("delete", path, body);
    }
}
