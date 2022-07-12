import Tag from "./Tag";
import Author from "./Author";

interface Post {
  author: Author;
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
  parent?: {
    id: string;
    frontmatter: {
      author: Author;
    };
  };
}

export interface PostListItem extends Post { }

export default Post;
