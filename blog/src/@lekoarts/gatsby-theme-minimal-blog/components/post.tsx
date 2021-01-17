/** @jsx jsx */
import { jsx, Heading } from "theme-ui";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout";
import SEO from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo";

import ItemTags from "./item-tags";
import { Post as PostData } from "../../../types";

type PostProps = {
  post: PostData;
};

const px = [`32px`, `16px`, `8px`, `4px`];
const shadow = px.map((v) => `rgba(0, 0, 0, 0.15) 0px ${v} ${v} 0px`);

const Post = ({ post }: PostProps) => (
  <Layout>
    <SEO
      title={post.title}
      description={post.description ?? post.excerpt}
      image={post.banner?.childImageSharp.resize.src ?? undefined}
      pathname={post.slug}
      canonicalUrl={post.canonicalUrl}
    />
    <Heading as="h1" variant="styles.h1">
      {post.title}
    </Heading>
    <p
      sx={{
        color: `secondary`,
        mt: 3,
        a: { color: `secondary` },
        fontSize: [1, 1, 2],
      }}
    >
      <time>{post.date}</time>
      {post.author && ` — `}
      {post.author && <span>{post.author}</span>}
      {post.tags && (
        <React.Fragment>
          {` — `}
          <ItemTags tags={post.tags} />
        </React.Fragment>
      )}
    </p>
    <section
      sx={{
        my: 5,
        ".gatsby-resp-image-wrapper": {
          my: [4, 4, 5],
          boxShadow: shadow.join(`, `),
        },
        variant: `layout.content`,
      }}
    >
      <MDXRenderer>{post.body}</MDXRenderer>
    </section>
  </Layout>
);

export default Post;
