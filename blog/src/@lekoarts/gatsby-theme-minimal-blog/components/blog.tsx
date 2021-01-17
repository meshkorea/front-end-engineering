/** @jsx jsx */
import { jsx, Heading } from "theme-ui";
import { Link } from "gatsby";
import { Flex } from "@theme-ui/components";
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config";
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes";
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout";
import SEO from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo";

import Listing from "./listing";
import { Post } from "../../../types";

type PostsProps = {
  posts: Post[];
  [key: string]: any;
};

const Blog = ({ posts }: PostsProps) => {
  const { tagsPath, basePath } = useMinimalBlogConfig();

  return (
    <Layout>
      <SEO title="Blog" />
      <Flex
        sx={{
          alignItems: `center`,
          justifyContent: `space-between`,
          flexFlow: `wrap`,
        }}
      >
        <Heading as="h1" variant="styles.h1" sx={{ marginY: 2 }}>
          Blog
        </Heading>
        <Link
          sx={{ variant: `links.secondary`, marginY: 2 }}
          to={replaceSlashes(`/${basePath}/${tagsPath}`)}
        >
          모든 태그
        </Link>
      </Flex>
      <Listing posts={posts} sx={{ mt: [4, 5] }} />
    </Layout>
  );
};

export default Blog;
