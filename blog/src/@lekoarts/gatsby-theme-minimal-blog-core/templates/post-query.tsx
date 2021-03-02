import { graphql } from "gatsby";
import PostComponent from "@lekoarts/gatsby-theme-minimal-blog-core/src/components/post";

export default PostComponent;

export const query = graphql`
  query($slug: String!, $formatString: String!) {
    post(slug: { eq: $slug }) {
      slug
      title
      date(formatString: $formatString)
      tags {
        name
        slug
      }
      description
      body
      excerpt
      timeToRead
      ... on MdxPost {
        id
        parent {
          ... on Mdx {
            id
            frontmatter {
              author {
                id
                name
                bio
                github
                avatar {
                  publicURL
                }
              }
            }
          }
        }
      }
    }
  }
`;
