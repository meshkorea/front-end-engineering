/** @jsx jsx */
import { jsx, Heading, Flex } from "theme-ui";
import { Link } from "gatsby";
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config";
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout";
import SEO from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo";
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes";

import Listing from "./listing";
import { PostListItem } from "types";

type TagProps = {
  posts: PostListItem[];
  pageContext: {
    isCreatedByStatefulCreatePages: boolean;
    slug: string;
    name: string;
    [key: string]: any;
  };
};

const Tag = ({ posts, pageContext }: TagProps) => {
  const { tagsPath, basePath } = useMinimalBlogConfig();

  return (
    <Layout>
      <SEO title={`Tag: ${pageContext.name}`} />
      <Flex
        sx={{
          alignItems: `center`,
          justifyContent: `space-between`,
          flexFlow: `wrap`,
        }}
      >
        <Heading as="h1" variant="styles.h1" sx={{ marginY: 2 }}>
          {pageContext.name}
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

export default Tag;
