import createClient, { Middleware } from "openapi-fetch";
import { paths } from "./schema";

const skipPaths = [
  "/auth/login",
  "/auth/register",
  "/auth/refresh",
  "/auth/logout",
];

const myMiddleware: Middleware = {
  async onRequest({ request, schemaPath }) {
    if (!skipPaths.includes(schemaPath)) {
      const accessToken = localStorage.getItem("accessToken");
      request.headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return request;
  },
  async onResponse({ response }) {
    if (!response.ok) {
      let message = "Something went wrong";
      try {
        const errorObj = await response.clone().json();

        if (errorObj.message) {
          message = errorObj.message;
        } else if (errorObj.messages) {
          message = errorObj.messages.join(", ");
        } else if (errorObj instanceof String) {
          message = errorObj.toString();
        }
        throw new Error(message);
      } catch (e) {
        console.error("Error parsing response", e);
        throw new Error(message);
      }
    }
  },
};

const client = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});

client.use(myMiddleware);

export default client;
