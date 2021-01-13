type Post = {
  frontmatter: { 
    author: {
      id: string;
      name: string;
    }
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    description: string;
    timeToRead?: number;
    tags?: string[]
  };
  fields?: {
    [key: string]: any;
  }
}

export default Post;