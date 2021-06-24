require(`dotenv`).config({
  path: `.env`,
});

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;

module.exports = {
  pathPrefix: "/front-end-engineering",
  siteMetadata: {
    // Used for the title template on pages other than the index site
    siteTitle: "Mesh Korea FE Blog",
    // Default title of the page
    siteTitleAlt: "Mesh Korea Frontend Blog",
    // Will be set on the <html /> tag
    siteLanguage: "ko",
    // Used for SEO
    siteDescription: "메쉬코리아 프론트엔드 팀 블로그 입니다.",
    // Can be used for e.g. JSONLD
    siteHeadline: `Mesh Koera FE Blog`,
    // Will be used to generate absolute URLs for og:image etc.
    siteUrl: `https://mesh.dev/front-end-engineering`,
  },
  mapping: {
    "Mdx.frontmatter.author": `AuthorYaml`,
  },
  plugins: [
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        formatString: "YYYY.MM.DD",
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`,
          },
          {
            title: `About`,
            slug: `/about`,
          },
        ],
        externalLinks: [
          {
            name: `Career`,
            url: `https://meshkorea.net/kr/career/`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Mesh Korea Web Frontend Blog`,
        short_name: `mesh-fe-blog`,
        description: `This site is Mesh Korea's Web Front-end blog. All articles are published by our team member.`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#1b3993`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: "content",
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`],
        gatsbyRemarkPlugins: [
          "gatsby-remark-copy-linked-files",
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              showCaptions: true,
            },
          },
        ],
        plugins: ["gatsby-transformer-yaml"],
      },
    },
  ].filter(Boolean),
};
