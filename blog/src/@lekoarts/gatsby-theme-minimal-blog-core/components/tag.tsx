import React from "react"
import Tag from "@lekoarts/gatsby-theme-minimal-blog/src/components/tag"
import getPostsFromQuery from "../../../utils/getPostsFromQuery"
import { AllPostResult } from "../../../types"

type Props = {
  data: {
    allPost: AllPostResult;
  }
  pageContext: {
    isCreatedByStatefulCreatePages: boolean
    slug: string
    name: string
    [key: string]: any
  }
  [key: string]: any
}

export default function MinimalBlogCoreTag({ ...props }: Props) {
  const {
    data: { allPost },
  } = props

  const posts = getPostsFromQuery(allPost);

  return <Tag posts={posts} {...props} />
}
