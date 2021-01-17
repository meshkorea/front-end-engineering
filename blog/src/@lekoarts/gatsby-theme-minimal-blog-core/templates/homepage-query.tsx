import { graphql } from "gatsby";
import HomepageComponent from "@lekoarts/gatsby-theme-minimal-blog-core/src/components/homepage";

export default HomepageComponent;

export const query = graphql`
  query($formatString: String!) {
    allPost(sort: { fields: date, order: DESC }, limit: 3) {
      nodes {
        id
        slug
        title
        date(formatString: $formatString)
        excerpt
        timeToRead
        tags {
          name
          slug
        }
      }
      edges {
        node {
          ... on MdxPost {
            parent {
              ... on Mdx {
                id
                frontmatter {
                  author
                }
              }
              id
            }
          }
          id
        }
      }
    }
  }
`;
