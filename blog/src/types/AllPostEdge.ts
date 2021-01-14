type AllPostEdge = {
  node: {
    id: string;
    parent: {
      id: string;
      frontmatter: {
        author: string;
      }
    }
  }
}

export default AllPostEdge;