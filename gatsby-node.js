const { graphql } = require("gatsby");
const path = require("path");
const _ = require("lodash");
// const { default: ThemePage } = require("./src/components/themePage");

// this is on compile, mybe i could write other stuff (like colour changes) in here?

exports.onCreateNode = async ({ node, actions }) => {
    const { createNodeField } = actions


    // Add a category field to all MarkdownRemark nodes
    const contentDir = path.resolve("./src/content");

    if (node.internal.type === "MarkdownRemark") {
        const category = path.dirname(
            path.relative(contentDir, node.fileAbsolutePath)
        )
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
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const workPostTemplate = path.resolve("./src/templates/workPost.js");
    const gardenPostTemplate = path.resolve("./src/templates/gardenPost.js");

    const result = await graphql(`
        
        {
            sound: allMarkdownRemark (filter: {fileAbsolutePath: {regex: "/(sound)/"  }})
            {   
                nodes {
                    fields {
                        slug
                    }
                }
            }

            garden: allMarkdownRemark ( filter: {fields: {category: {eq: "garden"}}})
            {
                nodes {
                    fields {
                        slug
                    }
                }
            }

            design: allMarkdownRemark ( filter: {fileAbsolutePath: {regex: "/(design)/"  }})
            {   
                nodes {
                    fields {
                        slug
                    }
                }
            }
          
          research: allMarkdownRemark (filter: {fileAbsolutePath: {regex: "/(research)/"  }})
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
    // TODO: Turn this into a more efficient loop for each of the nodes in the data layer, or at least in a given array. Lots of redundancy rn
    result.data.sound.nodes.forEach(node => {
        createPage({
            path: node.fields.slug,
            component: workPostTemplate,
            context: {
                slug: node.fields.slug,
            },
        })
    })

    result.data.design.nodes.forEach(node => {
        createPage({
            path: node.fields.slug,
            component: workPostTemplate,
            context: {
                slug: node.fields.slug,
            },
        })
    })

    result.data.research.nodes.forEach(node => {
        createPage({
            path: node.fields.slug,
            component: workPostTemplate,
            context: {
                slug: node.fields.slug,
            },
        })
    })


    result.data.unsorted.nodes.forEach(node => {
        createPage({
            path: node.fields.slug,
            component: workPostTemplate,
            context: {
                slug: node.fields.slug,
            },
        })
    })

    // Create garden pages
    result.data.garden.nodes.forEach((node) => {
        createPage({
        path: node.fields.slug,
        component: gardenPostTemplate,
        context: {
            slug: node.fields.slug,
        },
        });
    });

    // Create about pages
    result.data.about.nodes.forEach(node => {
        createPage({
            path: node.fields.slug,
            component: workPostTemplate,
            context: {
                slug: node.fields.slug,
            },
        })
    })

}

