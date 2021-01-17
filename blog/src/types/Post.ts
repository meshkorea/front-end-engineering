import Tag from "./Tag";

type Post = {
  author: string;
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  description: string;
  timeToRead: number;
  tags: Tag[];
  body?: string;
  canonicalUrl?: string;
  banner?: {
    childImageSharp: {
      resize: {
        src: string;
      };
    };
  };
  parent?: {
    id: string;
    frontmatter: {
      author: string;
    };
  };
};

export default Post;
