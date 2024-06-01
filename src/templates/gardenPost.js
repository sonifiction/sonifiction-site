import React from "react";
import { graphql} from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Layout from "../components/layout";

const GardenPost = ({ data }) => {

    const {markdownRemark} = data;
    const {frontmatter, fields, html} = markdownRemark;

    return (
      <Layout name="Blog">
          <div className="container has-text-primary">
            <h1 className="title has-text-primary">{frontmatter.title}</h1>
            <h2 className="subtitle">
              by {frontmatter.author} &mdash; {frontmatter.date}
            </h2>
            <div
              className="content has-text-primary"
              dangerouslySetInnerHTML={{ __html: html }}
            ></div>
          </div>
      </Layout>
    );
}

export default GardenPost;

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "dddd, D MMMM yyyy")
        author
        
      }
    }
  }
`;