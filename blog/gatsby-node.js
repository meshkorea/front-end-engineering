const path = require("path");

exports.onCreateNode = ({ node }) => {
  if (node.internal.type === "MarkdownRemark") {
    let { slug: frontmatterSlug } = node.frontmatter;

    if (!frontmatterSlug) {
      throw new Error("'slug' field is required in frontmatter.");
    }
  }
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        utils: path.resolve(__dirname, "src/utils/"),
        types: path.resolve(__dirname, "src/types/"),
        components: path.resolve(__dirname, "src/components/")
      },
    },
  });
};
