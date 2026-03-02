import { defineConfig } from 'vitepress'

const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  title: 'ThreadQL Documentation',
  description: 'Comprehensive documentation for ThreadQL - Natural Language to SQL Query System',
  base: isProduction ? '/threadql-docs/' : '/',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Installation', link: '/installation/' },
      { text: 'API Reference', link: '/api/' },
      { text: 'MCP Tools', link: '/mcp-tools/' }
    ],

    sidebar: {
      '/': [
        {
          text: 'Documentation',
          items: [
            { text: 'Introduction', link: '/' },
            { text: 'Installation', link: '/installation/' },
            { text: 'API Reference', link: '/api/' },
            { text: 'MCP Tools', link: '/mcp-tools/' }
          ]
        }
      ]
    }
  },

  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }]
  ]
})
