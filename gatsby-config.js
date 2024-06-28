/**
 * @type {import('gatsby').GatsbyConfig}
 */


// Load general environment variables
require('dotenv').config();

// Load environment-specific variables based on NODE_ENV
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  flags: {
    DEV_SSR: false
  },
  siteMetadata: {
    title: `Sonifiction`,
    siteUrl: `https://www.sonifiction.net`,
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.jpg",
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: "./src/content",
      },
    },
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        useAutoGen: true, // useAutoGen: required 'true' to use autogen
        }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          // `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: true,
              sizeByPixelDensity: true,
              showCaptions: false
              }
            },
          `gatsby-remark-autolink-headers`,
          ]
        }
      },
    // `gatsby-transformer-remark`,
    `gatsby-plugin-catch-links`,
      {
          resolve: `gatsby-plugin-sass`,
          options: {
            // additionalData: "$env: " + process.env.NODE_ENV + ";",
            additionalData: "$primary:" + process.env.PRIMARY + ";" +
            "$text:" + process.env.SECONDARY + ";" +
            "$background-color:" + process.env.BACKGROUND + ";" 
        },
      },
    {
      resolve: "gatsby-remark-embed-video",
      options: {
        width: 800,
        ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
        // height: 400, // Optional: Overrides optional.ratio
        related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
        noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
        loadingStrategy: "lazy", //Optional: Enable support for lazy-load offscreen iframes. Default is disabled.
        urlOverrides: [
          {
            id: "youtube",
            embedURL: (videoId) =>
              `https://www.youtube-nocookie.com/embed/${videoId}`,
          },
        ], //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
        containerClass: "embedVideo-container", //Optional: Custom CSS class for iframe container, for multiple classes separate them by space
        iframeId: false, //Optional: if true, iframe's id will be set to what is provided after 'video:' (YouTube IFrame player API requires iframe id)
      },
    },
    "gatsby-remark-responsive-iframe", //Optional: Must be loaded after gatsby-remark-embed-video
    "gatsby-plugin-twitter",
    // 'gatsby-transformer-bibtex',
    // 
    // Custom rss stuff
    // `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.html,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + "/" + edge.node.fields.slug.replace(/\/index/g, '').replace(/\/render\//g, '').toLowerCase(),
                  guid: site.siteMetadata.siteUrl + "/" + edge.node.fields.slug.replace(/\/index/g, '').replace(/\/render\//g, '').toLowerCase(),
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(sort: { frontmatter: { date: DESC }}, filter: {fileAbsolutePath: {regex: "/(render)/"  }}) {
                  edges {
                    node {
                      fields {
                          slug
                      }
                      html
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Sonifiction",
          },
        ],
      },
    },
  ],
};