/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
// @ts-ignore
import Hero from "../texts/hero";
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes";
import Title from "@lekoarts/gatsby-theme-minimal-blog/src/components/title";
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout";
import Listing from "@lekoarts/gatsby-theme-minimal-blog/src/components/listing";
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config";

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
      <Title text="최신 글">
        <Link to={replaceSlashes(`/${basePath}/${blogPath}`)}>
          더보기
        </Link>
      </Title>
      <Listing posts={posts} showTags={true} />
    </Layout>
  );
};

export default Homepage;
