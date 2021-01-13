/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import { Box } from "@theme-ui/components";
import { Link } from "gatsby";
import ItemAuthor from "./item-author";
import ItemTags from "./item-tags";
import Post from "../../../types/Post";

type BlogListItemProps = {
  post: Post;
  showTags?: boolean;
};

const BlogListItem = ({ post, showTags = true }: BlogListItemProps) => (
  <Box mb={4}>
    <Link to={post.fields.slug} sx={{ fontSize: [1, 2, 3], color: `text` }}>
      {post.frontmatter.title}
    </Link>
    <p
      sx={{
        color: `secondary`,
        mt: 1,
        a: { color: `secondary` },
        fontSize: [1, 1, 2],
      }}
    >
      <time>{post.frontmatter.date}</time>
      {", "}
      <ItemAuthor author={post.frontmatter.author} />
      {post.frontmatter.tags && showTags && (
        <>
          {", "}
          <React.Fragment>
            <ItemTags tags={post.frontmatter.tags} />
          </React.Fragment>
        </>
      )}
    </p>
  </Box>
);

export default BlogListItem;
