import { PostDetail, PostResult } from "types";

const getPostFromQuery = (result: PostResult): PostDetail => ({
  ...result,
  author: result.parent.frontmatter.author,
});

export default getPostFromQuery;
