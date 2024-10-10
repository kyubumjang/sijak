"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode, useState } from "react";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { toast } from "sonner";

type Props = {
  children: ReactNode;
};

const Providers = ({ children }: Props) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnMount: false,
          retry: false,
        },
      },
      queryCache: new QueryCache({
        onError: (error, query) => {
          if (query.meta && query.meta.errorMessage) {
            toast.error(`${query.meta.errorMessage}`);
          } else {
            toast.error(`Something went wrong: ${error.message}`);
          }
        },
      }),
    }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Providers;
