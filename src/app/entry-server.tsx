// Ultra simple server-side rendering function
export function render(url: string) {
  console.log('🎬 SSR rendering:', url)
  
  try {
    // Simple HTML for testing
    const appHtml = `
      <div id="app">
        <h1>Capitole Movie App</h1>
        <p>SSR is working! Rendering: ${url}</p>
        <nav>
          <a href="/">Home</a> | 
          <a href="/film/123">Sample Film</a> | 
          <a href="/wishlist">Wishlist</a>
        </nav>
      </div>
    `

    console.log('✅ SSR completed successfully')
    return appHtml
  } catch (error) {
    console.error('❌ SSR Error:', error)
    return '<div>Error rendering page</div>'
  }
}