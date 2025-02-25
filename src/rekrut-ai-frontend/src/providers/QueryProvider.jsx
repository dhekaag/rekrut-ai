import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./QueryClient";

export const QueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
