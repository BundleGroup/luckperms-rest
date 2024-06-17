import { AxiosInstance } from "axios";
export interface LuckpermsClientOptions {
    url: string;
    apiKey?: string;
}
declare type APIResponse = any;
declare type RequestMethod = "get" | "post" | "delete" | "put" | "patch";
export declare class LuckpermsRestClient {
    options: LuckpermsClientOptions;
    restClient: AxiosInstance;
    constructor(options: LuckpermsClientOptions);
    request(method: RequestMethod, path: string, body?: any, query?: object): Promise<APIResponse>;
    get(path: string, query?: object): Promise<APIResponse>;
    post(path: string, body: object): Promise<APIResponse>;
    put(path: string, body: object): Promise<APIResponse>;
    patch(path: string, body: object): Promise<APIResponse>;
    delete(path: string, body?: object): Promise<APIResponse>;
}
export {};
