import { CreateKeyOptions, KeyResponse, Key } from "./types";
export declare class Keys {
    private _credentials;
    private _apiUrl;
    constructor(_credentials: string, _apiUrl: string);
    private apiPath;
    /**
     * Retrieves all keys associated with the provided projectId
     * @param projectId Unique identifier of the project containing API keys
     */
    list(projectId: string): Promise<KeyResponse>;
    /**
     * Retrieves a specific key associated with the provided projectId
     * @param projectId Unique identifier of the project containing API keys
     * @param keyId Unique identifier for the key to retrieve
     */
    get(projectId: string, keyId: string): Promise<Key>;
    /**
     * Creates an API key with the provided scopes
     * @param projectId Unique identifier of the project to create an API key under
     * @param comment Comment to describe the key
     * @param scopes Permission scopes associated with the API key
     * @param options Optional options used when creating API keys
     */
    create(projectId: string, comment: string, scopes: Array<string>, options?: CreateKeyOptions): Promise<Key>;
    /**
     * Deletes an API key
     * @param projectId Unique identifier of the project to create an API key under
     * @param keyId Unique identifier for the key to delete
     */
    delete(projectId: string, keyId: string): Promise<void>;
}
