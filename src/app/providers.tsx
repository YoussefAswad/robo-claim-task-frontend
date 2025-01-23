"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NotificationsProvider } from "@toolpad/core";
import { IoProvider } from "socket.io-react-hook";

export const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <IoProvider>
          <NotificationsProvider>{children}</NotificationsProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </IoProvider>
      </QueryClientProvider>
    </>
  );
};

export default Providers;
