import { AllPostEdge, AllPostNode } from "types";

type QueryResult = {
  nodes: AllPostNode[];
  edges: AllPostEdge[];
};

const getPostsFromQuery = ({ nodes, edges }: QueryResult) =>
  nodes.map((node) => {
    const postId = node.id;
    const mdxPost = edges.find((edge) => {
      return edge.node.id === postId;
    })?.node;
    return {
      ...node,
      author: mdxPost?.parent.frontmatter.author,
    };
  });

export default getPostsFromQuery;
