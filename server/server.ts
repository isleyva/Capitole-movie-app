import fs from "node:fs/promises";
import path from "node:path";
import express from "express";
import { createServer as createViteServer } from "vite";
import { PassThrough } from "node:stream";

const isProd = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3000;

(async () => {
  const app = express();
  let vite: any;

  if (!isProd) {
    // DEV: Vite middleware gives HMR + on‑the‑fly transforms
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    // PROD: Serve prebuilt client assets (HTML is still SSR injected)
    app.use(express.static("dist/client", { index: false, maxAge: "1h" }));
  }

  // Catch‑all GET for HTML navigation
  app.get("*", async (req, res, next) => {
    let ended = false; // Tracks if response is already finalized
    const endOnce = (cb?: () => void) => {
      if (ended) return;
      ended = true;
      cb?.();
    };

    // Method must be GET (skip POST/PUT/etc.) for this app example, should be refined if we add APIs later on same server
    if (req.method !== "GET") return next();

    const accept = req.headers.accept || "";

    // Only proceed if client explicitly wants HTML
    if (!accept.includes("text/html")) return next();

    // Skip if it looks like an asset (has extension)
    if (
      /\.(?:js|mjs|ts|tsx|jsx|css|map|json|png|jpe?g|gif|svg|ico|webp|woff2?|ttf|eot)$/i.test(
        req.path
      )
    ) {
      return next();
    }

    // Skip internal Vite/HMR endpoints
    if (req.path.startsWith("/@vite") || req.path.startsWith("/@id/")) {
      return next();
    }

    // Proceed with SSR in case any of the previous checks matched

    try {
      const url = req.originalUrl;

      let template = await fs.readFile(
        path.resolve(isProd ? "dist/client/index.html" : "index.html"),
        "utf-8"
      );
      if (!isProd) template = await vite.transformIndexHtml(url, template);

      // Split template at SSR injection marker
      const [head, tail] = template.split("<!--ssr-outlet-->");

      // Dynamically load SSR entry (dev: transform, prod: bundled)
      const mod = !isProd
        ? await vite.ssrLoadModule("/src/ApplicationLayer/entry-server.tsx")
        : await import(path.resolve("dist/server/entry-server.js"));

      if (typeof mod.streamRender !== "function") {
        throw new Error("streamRender export not found in entry-server");
      }

      const body = new PassThrough();

      // Abort streaming if client disconnects
      res.on("close", () => {
        if (!ended) {
          body.destroy();
          endOnce();
        }
      });

      // Forward streamed chunks
      body.on("data", (chunk) => {
        if (!ended) res.write(chunk);
      });

      // When React stream ends, append tail and finish
      body.on("end", () => {
        endOnce(() => {
          res.write(tail || "");
          res.end();
        });
      });

      res.status(200).setHeader("Content-Type", "text/html; charset=utf-8");
      res.write(head || "");

      // Kick off React streaming
      mod.streamRender({
        url,
        onShellReady(stream: NodeJS.ReadableStream) {
          // Shell is ready; pipe React output into PassThrough
          stream.pipe(body);
        },
        onError(err: unknown) {
          console.error("SSR stream error:", err);
          if (!ended) {
            endOnce(() => {
              res.statusCode = 500;
              res.end(
                "<!doctype html><h1>SSR Error</h1><pre>" +
                  String(err) +
                  "</pre>"
              );
            });
          }
        },
      });
    } catch (e: any) {
      if (vite && !isProd) vite.ssrFixStacktrace?.(e);
      if (!ended) {
        res.status(500).end("Internal Server Error");
      }
    }
  });

  app.listen(port, () =>
    console.log(
      `SSR server running at http://localhost:${port} (mode=${
        isProd ? "production" : "development"
      })`
    )
  );
})();
