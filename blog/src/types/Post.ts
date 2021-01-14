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
}

export default Post;