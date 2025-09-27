import express from 'express'
import { createServer as createViteServer } from 'vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 8000

async function createServer() {
  const app = express()

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  // Don't use vite.ssrLoadModule as middleware - that's wrong

  if (isProduction) {
    // In production, serve static files
    app.use(express.static(path.resolve(__dirname, '../dist/client')))
  } else {
    // In dev, use Vite middleware
    app.use(vite.middlewares)
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string
      let render: any

      if (isProduction) {
        // In production, read pre-built template and render function
        template = fs.readFileSync(
          path.resolve(__dirname, '../dist/client/index.html'),
          'utf-8'
        )
        render = (await import('../dist/server/entry-server.js')).render
      } else {
        // In development, always read fresh template and render
        template = fs.readFileSync(
          path.resolve(__dirname, '../index.html'),
          'utf-8'
        )
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/app/entry-server.tsx')).render
      }

      const appHtml = await render(url)

      const html = template.replace(`<!--ssr-outlet-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e: any) {
      // If an error is caught, let Vite fix the stack trace so it maps back
      // to your actual source code.
      if (!isProduction) {
        vite.ssrFixStacktrace(e)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`)
  })
}

createServer()