// Ultra simple server-side rendering function

import { renderToPipeableStream } from "react-dom/server";
import { StrictMode } from "react";
import { StaticRouter } from "react-router-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PassThrough } from "node:stream";
import App from "./App";

interface RenderOptions {
  url: string;
  onShellReady: (stream: NodeJS.ReadableStream) => void;
  onAllReady: () => void;
  onError: (err: unknown) => void;
}

export function streamRender({
  url,
  onShellReady,
  onAllReady,
  onError,
}: RenderOptions) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60_000, retry: false },
    },
  });

  let didError = false;
  const abortDelay = 15000;

  const pipeable = renderToPipeableStream(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </QueryClientProvider>
    </StrictMode>,
    {
      onShellReady() {
        const body = new PassThrough();
        pipeable.pipe(body);
        onShellReady(body);
      },
      onAllReady() {
        onAllReady();
      },
      onError(err) {
        didError = true;
        onError(err);
      },
    }
  );

  setTimeout(() => {
    if (!didError) pipeable.abort();
  }, abortDelay);
}

