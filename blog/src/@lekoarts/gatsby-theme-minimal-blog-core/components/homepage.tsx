import React from "react"
import Homepage from "@lekoarts/gatsby-theme-minimal-blog/src/components/homepage";

type Props = {
  data: {
    allMarkdownRemark: any
    [key: string]: string
  }
  [key: string]: any
}

export default function MinimalBlogCoreHomepage({ ...props }: Props) {
  const {
    data: { allMarkdownRemark },
  } = props

  return <Homepage posts={allMarkdownRemark.edges.map(e => e.node.frontmatter)}/>
}
