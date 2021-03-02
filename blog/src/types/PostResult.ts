import Tag from "./Tag";
import Author from "./Author";

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
      author: Author;
    };
  };
};

export default PostResult;
