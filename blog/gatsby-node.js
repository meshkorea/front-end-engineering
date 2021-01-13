exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }, themeOptions) => {
  const { createNode, createNodeField } = actions;
  if (node.internal.type === "MarkdownRemark") {
    let {
      slug: frontmatterSlug,
    } = node.frontmatter;

    if (!frontmatterSlug) {
      throw new Error("'slug' is required in frontmatter.")
    }

    createNodeField({
      node,
      name: "slug",
      value: frontmatterSlug,
    });
  }
}