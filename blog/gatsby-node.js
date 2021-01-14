exports.onCreateNode = ({ node }) => {
  if (node.internal.type === "MarkdownRemark") {
    let {
      slug: frontmatterSlug,
    } = node.frontmatter;

    if (!frontmatterSlug) {
      throw new Error("'slug' field is required in frontmatter.")
    }
  }
}

