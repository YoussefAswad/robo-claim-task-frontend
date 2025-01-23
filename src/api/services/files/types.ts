import { components, paths } from "@/api/schema";

export type QueryFilesRequest = paths["/files"]["get"]["parameters"]["query"];

export type FileOrderOptions = QueryFilesRequest["sortField"];

export type FileDto = components["schemas"]["FileDto"];
