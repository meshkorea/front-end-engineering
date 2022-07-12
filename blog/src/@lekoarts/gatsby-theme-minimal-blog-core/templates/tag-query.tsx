import { graphql } from "gatsby";
import TagComponent from "@lekoarts/gatsby-theme-minimal-blog-core/src/components/tag";

export default TagComponent;

export const query = graphql`
  query($slug: String!, $formatString: String!) {
    allPost(
      sort: { fields: date, order: DESC }
      filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
    ) {
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
                  author {
                    id
                    name
                    bio
                    avatar {
                      publicURL
                    }
                  }
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
