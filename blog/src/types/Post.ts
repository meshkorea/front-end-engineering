import Tag from "./Tag";

interface Post {
  author: string;
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  description: string;
  timeToRead: number;
  tags: Tag[];
}

export interface PostDetail extends Post {
  body: string;
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
}

export interface PostListItem extends Post { }

export default Post;
