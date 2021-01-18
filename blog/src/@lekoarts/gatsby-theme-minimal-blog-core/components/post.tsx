import React from "react";

import { PostResult } from "types";
import { getPostFromQuery } from "utils";
import Post from "../../gatsby-theme-minimal-blog/components/post";

type Props = {
  data: {
    post: PostResult;
  };
  [key: string]: any;
};

export default function MinimalBlogCorePost({ ...props }: Props) {
  const post = getPostFromQuery(props.data.post);
  return <Post post={post} {...props} />;
}
