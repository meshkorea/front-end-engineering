/** @jsx jsx */
import React from "react"
import { MDXProvider } from "@mdx-js/react";
import { Global } from "@emotion/core"
import { Box, Container, jsx, ImageProps } from "theme-ui"
import "typeface-ibm-plex-sans"
import SEO from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo";
import Header from "./header";
import Footer from "@lekoarts/gatsby-theme-minimal-blog/src/components/footer";
import CodeStyles from "@lekoarts/gatsby-theme-minimal-blog/src/styles/code";
import SkipNavLink from "@lekoarts/gatsby-theme-minimal-blog/src/components/skip-nav";
import Gif from "components/Gif";

type LayoutProps = { children: React.ReactNode; className?: string }

const Layout = ({ children, className = `` }: LayoutProps) => (
  <React.Fragment>
    <Global
      styles={(theme) => ({
        "*": {
          boxSizing: `inherit`,
        },
        html: {
          WebkitTextSizeAdjust: `100%`,
        },
        img: {
          borderStyle: `none`,
        },
        pre: {
          fontFamily: `monospace`,
          fontSize: `1em`,
        },
        "[hidden]": {
          display: `none`,
        },
        "::selection": {
          backgroundColor: theme.colors.text,
          color: theme.colors.background,
        },
        a: {
          transition: `all 0.3s ease-in-out`,
          color: `text`,
        },
      })}
    />
    <SEO />
    <SkipNavLink>Skip to content</SkipNavLink>
    <Container>
      <Header />
      <Box id="skip-nav" sx={{ ...CodeStyles }} className={className}>
        <MDXProvider components={{
          img: (props: ImageProps) => {
            if (props.src?.match(/.*?\.(gif|svg)/)) {
              return <Gif {...props} />
            }

            return <img src={props.src} {...props} />
          }
        }}>
          {children} 
        </MDXProvider>
      </Box>
      <Footer />
    </Container>
  </React.Fragment>
)

export default Layout
