import { waitForOptions, waitFor, renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";

/**
 * Withouth this cumbersome setup, the test pass but we get various errors
 * about code not wrapped in act() function, but wrapping the code in act()
 * does not help.
 * The waitFor + renderHook is the only way to get rid of these warnings
 * @param callback
 * @param options
 * @returns
 */
export function waitForHook<T>(callback: () => T, options?: waitForOptions) {
  return waitFor(
    async () =>
      renderHook(callback, {
        wrapper: withQueryClient,
      }),
    options
  );
}

const queryClient = new QueryClient();
export const withQueryClient = ({ children }: any) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

