/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes";
import Title from "@lekoarts/gatsby-theme-minimal-blog/src/components/title";
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout";
import Listing from "@lekoarts/gatsby-theme-minimal-blog/src/components/listing";
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config";

// @ts-ignore
// ignore mdx import ts error
import Hero from "../texts/hero";
import { Post } from "../../../types";

type HomePageProps = {
  posts: Post[];
  [key: string]: any;
};

const Homepage = ({ posts }: HomePageProps) => {
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
      <Title text="최신 글">
        <Link to={replaceSlashes(`/${basePath}/${blogPath}`)}>더보기</Link>
      </Title>
      <Listing posts={posts} showTags={true} />
    </Layout>
  );
};

export default Homepage;
