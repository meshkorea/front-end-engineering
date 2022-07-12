import React from "react";
import Blog from "@lekoarts/gatsby-theme-minimal-blog/src/components/blog";

import { getPostsFromQuery } from "utils";
import { AllPostResult } from "types";

type Props = {
  data: {
    allPost: AllPostResult;
  };
  [key: string]: any;
};

export default function MinimalBlogCoreBlog({ ...props }: Props) {
  const {
    data: { allPost },
  } = props;

  const posts = getPostsFromQuery(allPost);

  return <Blog posts={posts} {...props} />;
}
