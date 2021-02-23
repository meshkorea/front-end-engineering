import Tag from "./Tag";

type PostResult = {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  description: string;
  timeToRead: number;
  tags: Tag[];
  body: string;
  canonicalUrl: string;
  parent: {
    id: string;
    frontmatter: {
      author: string;
    };
  };
};

export default PostResult;
