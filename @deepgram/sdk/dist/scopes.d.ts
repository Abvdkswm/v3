import { ScopeList, Message } from "./types";
export declare class Scopes {
    private _credentials;
    private _apiUrl;
    constructor(_credentials: string, _apiUrl: string);
    private apiPath;
    /**
     * Retrieves scopes of the specified member in the specified project.
     * @param projectId Unique identifier of the project
     * @param memberId Unique identifier of the member
     */
    get(projectId: string, memberId: string): Promise<ScopeList>;
    /**
     * Updates the scope for the specified member in the specified project.
     * @param projectId Unique identifier of the project
     * @param memberId Unique identifier of the member being updated
     * @param scope string of the scope to update to
     */
    update(projectID: string, memberId: string, scope: string): Promise<Message>;
}
