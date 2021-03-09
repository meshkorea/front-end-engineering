declare module "@mdx-js/react" {
  import React from 'react'
  export const MDXProvider: React.ComponentType<{
    components: Record<string, React.ComponentType<any>>
  }>
}
