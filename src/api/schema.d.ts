/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AppController_getHello"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/register": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthController_signup"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthController_signin"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/logout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthController_logout"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/refresh": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AuthController_refreshTokens"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/profile": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AuthController_profile"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/upload": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["UploadController_upload"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/files": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["FilesController_readMany"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/files/summary": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["FilesController_stats"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/files/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["FilesController_readOne"];
        put?: never;
        post?: never;
        delete: operations["FilesController_delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/files/download/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["FilesController_download"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        CreateUserDto: {
            name: string;
            email: string;
            password: string;
            isAdmin: boolean;
        };
        TokenResponseDto: {
            accessToken: string;
            refreshToken: string;
        };
        AuthDto: {
            email: string;
            password: string;
        };
        UserDto: {
            id: number;
            name: string;
            email: string;
            isAdmin: boolean;
        };
        FileDto: {
            id: string;
            originalName: string;
            mimeType: string;
            size: number;
            status: string;
            hash: string;
            dataSnippet: Record<string, never>;
            /** Format: date-time */
            createdAt: string;
            user: components["schemas"]["UserDto"];
        };
        QueryFilesResponseDto: {
            data: components["schemas"]["FileDto"][];
            page: number;
            pageSize: number;
            sortField: string;
            sortType: string;
            total: number;
        };
        FileTypeCount: {
            /**
             * @description MIME type of the file
             * @example application/pdf
             */
            mimeType: string;
            /**
             * @description Count of files with this MIME type
             * @example 42
             */
            count: number;
        };
        FileStatusCounts: {
            /**
             * @description Number of pending files
             * @example 10
             */
            pending: number;
            /**
             * @description Number of files being processed
             * @example 5
             */
            processing: number;
            /**
             * @description Number of completed files
             * @example 20
             */
            completed: number;
            /**
             * @description Number of failed files
             * @example 2
             */
            failed: number;
        };
        FileSummaryDto: {
            /**
             * @description Total number of files
             * @example 100
             */
            total: number;
            /**
             * @description Failure rate (ratio of failed files to total)
             * @example 0.02
             */
            failiureRate: number;
            /** @description Counts of files grouped by MIME type */
            typeCounts: components["schemas"]["FileTypeCount"][];
            /** @description Counts of files grouped by status */
            statusCounts: components["schemas"]["FileStatusCounts"];
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    AppController_getHello: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    AuthController_signup: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateUserDto"];
            };
        };
        responses: {
            /** @description User registered successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TokenResponseDto"];
                };
            };
        };
    };
    AuthController_signin: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AuthDto"];
            };
        };
        responses: {
            /** @description User logged in successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TokenResponseDto"];
                };
            };
        };
    };
    AuthController_logout: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description User logged out successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    AuthController_refreshTokens: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description User tokens refreshed successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TokenResponseDto"];
                };
            };
        };
    };
    AuthController_profile: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserDto"];
                };
            };
        };
    };
    UploadController_upload: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": {
                    files?: string[];
                };
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    FilesController_readMany: {
        parameters: {
            query: {
                page: number;
                pageSize: number;
                originalName?: string;
                status?: "completed" | "processing" | "failed" | "pending";
                mimetype?: string;
                sortField?: "originalName" | "mimetype" | "createdAt" | "size";
                sortType?: "asc" | "desc";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["QueryFilesResponseDto"];
                };
            };
        };
    };
    FilesController_stats: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["FileSummaryDto"];
                };
            };
        };
    };
    FilesController_readOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description File id */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["FileDto"];
                };
            };
        };
    };
    FilesController_delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description File id */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    FilesController_download: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description File id */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
