// Ultra simple server-side rendering function

import { StrictMode } from "react";
import { StaticRouter } from "react-router-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderToString } from "react-dom/server";
import App from "./App";

const queryClient = new QueryClient();

export function render(_url: string) {
  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <StaticRouter location={_url}>
          <App />
        </StaticRouter>
      </StrictMode>
    </QueryClientProvider>
  );
  return { html };
}

// import { renderToString } from 'react-dom/server'
// import { StaticRouter } from 'react-router-dom/server'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import App from './App.tsx'

// // Simple server-side rendering function
// export function render(url: string) {
//   console.log('🎬 SSR rendering:', url)

//   try {
//     // Create a fresh QueryClient for each request
//     const queryClient = new QueryClient({
//       defaultOptions: {
//         queries: {
//           staleTime: 1000 * 60 * 5,
//           gcTime: 1000 * 60 * 10,
//           retry: false, // Don't retry on server
//         },
//       },
//     })

//     // Create the React app
//     const appHtml = renderToString(
//       <QueryClientProvider client={queryClient}>
//         <StaticRouter location={url}>
//           <App />
//         </StaticRouter>
//       </QueryClientProvider>
//    )

//     console.log('✅ SSR completed successfully')
//     return appHtml
//   } catch (error) {
//     console.error('❌ SSR Error:', error)
//     return '<div>Error rendering page</div>'
//   }
// }

// export function render(url: string) {
//   console.log('🎬 SSR rendering:', url)

//   try {
//     // Simple HTML for testing
//     const appHtml = `
//       <div id="app">
//         <h1>Capitole Movie App</h1>
//         <p>SSR is working! Rendering: ${url}</p>
//         <nav>
//           <a href="/">Home</a> |
//           <a href="/film/123">Sample Film</a> |
//           <a href="/wishlist">Wishlist</a>
//         </nav>
//       </div>
//     `

//     console.log('✅ SSR completed successfully')
//     return appHtml
//   } catch (error) {
//     console.error('❌ SSR Error:', error)
//     return '<div>Error rendering page</div>'
//   }
// }
