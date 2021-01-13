exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }, themeOptions) => {
  const { createNode, createNodeField } = actions;
  if (node.internal.type === "MarkdownRemark") {
    let {
      slug,
    } = node.frontmatter;

    const { relativePath } = getNode(node.parent);

    if (!slug) {
      slug = `/${relativePath.replace(/(\.md|\/index\.md)/, "")}/`;
    }

    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
}