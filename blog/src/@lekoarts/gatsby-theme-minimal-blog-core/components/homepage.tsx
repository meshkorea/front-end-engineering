import React from "react";

import { AllPostNode, AllPostEdge } from "types";
import getPostsFromQuery from "utils/getPostsFromQuery";
import Homepage from "../../gatsby-theme-minimal-blog/components/homepage";

type Props = {
  data: {
    allPost: {
      nodes: AllPostNode[];
      edges: AllPostEdge[];
    };
  };
};

export default function MinimalBlogCoreHomepage({ ...props }: Props) {
  const {
    data: { allPost },
  } = props;

  const posts = getPostsFromQuery(allPost);
  return <Homepage posts={posts} {...props} />;
}
