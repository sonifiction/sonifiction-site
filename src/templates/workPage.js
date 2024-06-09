import React from "react";
import { graphql} from "gatsby";
import Layout from "../components/layout";
import WorkPost from "./workPost";

const WorkPage = ({ data, 
                    // pageContext 
                    }) => {
  // const {breadcrumb: { crumbs }} = pageContext
    const {markdownRemark} = data;
    // const {frontmatter, 
    //   // fields, 
    //   html} = markdownRemark;
    data = markdownRemark

    return (
      <Layout>
            <WorkPost data={data} ></WorkPost>
      </Layout>
    );
}

export default WorkPage;

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        subtitle
        date(formatString: "dddd, D MMMM yyyy")
        author
        
      }
    }
  }
`;