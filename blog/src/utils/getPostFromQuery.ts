import { Post, PostResult } from "../types";

const getPostFromQuery = (result: PostResult): Post => ({
  ...result,
  author: result.parent.frontmatter.author,
});

export default getPostFromQuery;