const { graphql } = require("gatsby");
const path = require("path");
const _ = require("lodash");
const { createFilePath } = require(`gatsby-source-filesystem`)
// const { default: ThemePage } = require("./src/components/themePage");

// this is on compile, mybe i could write other stuff (like colour changes) in here?

exports.onCreateNode = async ({ node, actions, getNode }) => {
    const { createNodeField } = actions


    // Add a category field to all MarkdownRemark nodes
    const contentDir = path.resolve("./src/content");

    if (node.internal.type === "MarkdownRemark") {
        const category = path.dirname(
            path.relative(contentDir, node.fileAbsolutePath)
        )
        const value = createFilePath({node, getNode})
        

    const fields = {
      category: category,
      slug:
        "/" +
        category +
        "/" +
        path.basename(node.fileAbsolutePath, ".md").replace("_", "-"),
    };

        for (const [name, value] of Object.entries(fields)) {
          createNodeField({ node, name, value });
        }
    }

    // if (node.internal.type === "MarkdownRemark") {
    //     createNodeField({
    //             name: node.fields.slug.replace(/\/index/g, '').replace(/\/render\//g, '').toLowerCase(),
    //             node,
    //             value,
    //         })
    //     }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const workPageTemplate = path.resolve("./src/templates/workPage.js");

    const result = await graphql(`
        
        {
            render: allMarkdownRemark (filter: {fileAbsolutePath: {regex: "/(render)/"  }})
            {   
                nodes {
                    fields {
                        slug
                    }
                }
            }
        
            about: allMarkdownRemark (filter: {fileAbsolutePath: {regex: "/(about)/"  }})
            {   
                nodes {
                    fields {
                        slug
                    }
                }
            }

            unsorted: allMarkdownRemark (filter: {fileAbsolutePath: {regex: "/(unsorted)/"  }})
            {   
                nodes {
                    fields {
                        slug
                    }
                }
            }

        }
    `);


    // Create work pages 
    result.data.render.nodes.forEach(node => {
        createPage({
            path: node.fields.slug.replace(/\/index/g, '').replace(/\/render\//g, '').toLowerCase(),
            component: workPageTemplate,
            context: {
                slug: node.fields.slug,
            },
        })
    })

    

    // result.data.unsorted.nodes.forEach(node => {
    //     createPage({
    //         path: node.fields.slug,
    //         component: workPostTemplate,
    //         context: {
    //             slug: node.fields.slug,
    //         },
    //     })
    // })



    // // Create about pages
    // result.data.about.nodes.forEach(node => {
    //     createPage({
    //         path: node.fields.slug,
    //         component: workPostTemplate,
    //         context: {
    //             slug: node.fields.slug,
    //         },
    //     })
    // })

}

