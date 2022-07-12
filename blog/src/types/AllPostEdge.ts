import Author from "./Author";

type AllPostEdge = {
  node: {
    id: string;
    parent: {
      id: string;
      frontmatter: {
        author: Author;
      };
    };
  };
};

export default AllPostEdge;
