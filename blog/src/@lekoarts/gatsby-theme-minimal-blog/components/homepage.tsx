/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
// import Layout from "./layout";
// import Title from "./title";
// import Listing from "./listing";
// import List from "./list";
// import useMinimalBlogConfig from "../hooks/use-minimal-blog-config";
// import useSiteMetadata from "../hooks/use-site-metadata";
// import replaceSlashes from "../utils/replaceSlashes";
// import { visuallyHidden } from "../styles/utils";
// @ts-ignore
import Hero from "../texts/hero";
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config";
import useSiteMetadata from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-site-metadata";
import { visuallyHidden } from "@lekoarts/gatsby-theme-minimal-blog/src/styles/utils";
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes";
import Title from "@lekoarts/gatsby-theme-minimal-blog/src/components/title";
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout";
import Listing from "@lekoarts/gatsby-theme-minimal-blog/src/components/listing";

type PostsProps = {
  posts: {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    description: string;
    timeToRead?: number;
    tags?: {
      name: string;
      slug: string;
    }[];
  }[];
  [key: string]: any;
};

const Homepage = ({ posts }: PostsProps) => {
  const { basePath, blogPath } = useMinimalBlogConfig();

  return (
    <Layout>
      <section
        sx={{
          mb: [4, 5, 6],
          p: { fontSize: [1, 2, 3], mt: 2 },
          variant: `section_hero`,
        }}
      >
        <Hero />
      </section>
      <Title text="Latest Posts">
        <Link to={replaceSlashes(`/${basePath}/${blogPath}`)}>
          Read all posts
        </Link>
      </Title>
      <Listing posts={posts} showTags={false} />
    </Layout>
  );
};

export default Homepage;
