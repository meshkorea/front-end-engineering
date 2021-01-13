import { graphql } from "gatsby"
import HomepageComponent from "@lekoarts/gatsby-theme-minimal-blog-core/src/components/homepage"

export default HomepageComponent

export const query = graphql`
  query($formatString: String!) {
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, limit: 3) {
      edges {
        node {
          frontmatter {
            author {
              id
              name
            }
            tags
            slug
            title
            date(formatString: $formatString)
          }
        }
      }
    }
  }
`
