import axios, { AxiosInstance } from "axios";
import { APIKeyError } from "./errors/APIKeyError";
import { APIRequestError } from "./errors/APIRequestError";

interface LuckpermsClientOptions {
    url: string,
    apiKey?: string
};

type APIResponse = any;

type RequestMethod = "get" | "post" | "delete" | "put" | "patch";

export class LuckpermsRestClient {
    options: LuckpermsClientOptions;
    restClient: AxiosInstance;

    constructor(options: LuckpermsClientOptions) {
        this.options = options;
        this.restClient = axios.create({
            baseURL: this.options.url,
            headers: this.options.apiKey ? {
                Authorization: `Bearer ${this.options.apiKey}`
            } : {},
        });
    }

    async request(method: RequestMethod, path: string, body?: any, query?: object): Promise<APIResponse> {
        try {
            let headers = body ? {
                'Content-Type': 'application/json'
            } : {};

            let response = await this.restClient.request({
                method,
                headers,
                url: path,
                data: JSON.stringify(body),
                params: query
            });

            return response.data;
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) throw new APIKeyError(error.response.data);
                else throw new APIRequestError(error.response.statusText)
            } else if (error.request) {
                throw new APIRequestError("No response received from the API");
            } else {
                throw error;
            }
        }
    }

    async get(path: string, query?: object): Promise<APIResponse> {
        return await this.request("get", path, undefined, query);
    }

    async post(path: string, body: object): Promise<APIResponse> {
        return await this.request("post", path, body);
    }

    async put(path: string, body: object): Promise<APIResponse> {
        return await this.request("put", path, body);
    }

    async patch(path: string, body: object): Promise<APIResponse> {
        return await this.request("patch", path, body);
    }

    async delete(path: string, body?: object): Promise<APIResponse> {
        return await this.request("delete", path, body);
    }
}