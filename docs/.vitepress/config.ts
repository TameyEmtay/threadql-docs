import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'ThreadQL Documentation',
  description: 'Comprehensive documentation for ThreadQL - Natural Language to SQL Query System',
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Installation', link: '/threadql/installation' },
      { text: 'API Reference', link: '/threadql/api' },
      { text: 'MCP Tools', link: '/threadql/mcp-tools' },
      { text: 'Examples', link: '/threadql/examples' },
      { text: 'Contributing', link: '/threadql/contributing' }
    ],

    sidebar: {
      '/threadql/': [
        {
          text: 'Getting Started',
          collapsible: true,
          items: [
            { text: 'Introduction', link: '/threadql/' },
            { text: 'Installation', link: '/threadql/installation' },
            { text: 'Quick Start', link: '/threadql/quick-start' }
          ]
        },
        {
          text: 'API Reference',
          collapsible: true,
          items: [
            { text: 'MCP Tools', link: '/threadql/mcp-tools' },
            { text: 'HTTP API', link: '/threadql/api' },
            { text: 'Configuration', link: '/threadql/configuration' }
          ]
        },
        {
          text: 'Examples',
          collapsible: true,
          items: [
            { text: 'Basic Usage', link: '/threadql/examples/basic' },
            { text: 'Advanced Queries', link: '/threadql/examples/advanced' },
            { text: 'CSV Export', link: '/threadql/examples/csv-export' }
          ]
        },
        {
          text: 'Reference',
          collapsible: true,
          items: [
            { text: 'Security', link: '/threadql/reference/security' },
            { text: 'Troubleshooting', link: '/threadql/reference/troubleshooting' },
            { text: 'Migration Guide', link: '/threadql/reference/migration' }
          ]
        },
        {
          text: 'Contributing',
          collapsible: true,
          items: [
            { text: 'Development', link: '/threadql/contributing/development' },
            { text: 'Documentation', link: '/threadql/contributing/documentation' },
            { text: 'Community', link: '/threadql/contributing/community' }
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
