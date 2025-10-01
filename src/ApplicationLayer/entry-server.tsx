import { PassThrough } from "node:stream";
import { StrictMode } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

interface RenderOptions {
  url: string;
  onShellReady: (stream: NodeJS.ReadableStream) => void;
  onError: (err: unknown) => void;
}

export function streamRender({ url, onShellReady, onError }: RenderOptions) {
  let didError = false;
  const abortDelay = 15000;

  const pipeable = renderToPipeableStream(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
    {
      onShellReady() {
        const body = new PassThrough();
        pipeable.pipe(body);
        onShellReady(body);
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
