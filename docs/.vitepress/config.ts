import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'ThreadQL Documentation',
  description: 'Comprehensive documentation for ThreadQL - Natural Language to SQL Query System',
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Installation', link: '/installation' },
      { text: 'API Reference', link: '/api' },
      { text: 'MCP Tools', link: '/mcp-tools' },
      { text: 'Examples', link: '/examples' },
      { text: 'Contributing', link: '/contributing' }
    ],

    sidebar: {
      '/': [
        {
          text: 'Getting Started',
          collapsible: true,
          items: [
            { text: 'Introduction', link: '/' },
            { text: 'Installation', link: '/installation' },
            { text: 'Quick Start', link: '/quick-start' }
          ]
        },
        {
          text: 'API Reference',
          collapsible: true,
          items: [
            { text: 'MCP Tools', link: '/mcp-tools' },
            { text: 'HTTP API', link: '/api' },
            { text: 'Configuration', link: '/configuration' }
          ]
        },
        {
          text: 'Examples',
          collapsible: true,
          items: [
            { text: 'Basic Usage', link: '/examples/basic' },
            { text: 'Advanced Queries', link: '/examples/advanced' },
            { text: 'CSV Export', link: '/examples/csv-export' }
          ]
        },
        {
          text: 'Reference',
          collapsible: true,
          items: [
            { text: 'Security', link: '/reference/security' },
            { text: 'Troubleshooting', link: '/reference/troubleshooting' },
            { text: 'Migration Guide', link: '/reference/migration' }
          ]
        },
        {
          text: 'Contributing',
          collapsible: true,
          items: [
            { text: 'Development', link: '/contributing/development' },
            { text: 'Documentation', link: '/contributing/documentation' },
            { text: 'Community', link: '/contributing/community' }
          ]
        }
      ]
    }
  },

  srcDir: 'docs',
  base: '/threadql-docs/',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }]
  ]
})
