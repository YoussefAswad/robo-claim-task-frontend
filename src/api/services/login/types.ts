import { paths } from "@/api/schema";

export type LoginData =
  paths["/auth/login"]["post"]["requestBody"]["content"]["application/json"];
