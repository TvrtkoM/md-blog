"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { store } from "@/state/store";
import { Provider as ReduxProvider } from "react-redux";

const queryClient = new QueryClient();

function RootProvider({ children }: PropsWithChildren<{}>) {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ReduxProvider>
  );
}

export default RootProvider;
