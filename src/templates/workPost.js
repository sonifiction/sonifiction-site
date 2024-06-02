import React from "react";
import { graphql} from "gatsby";
import Layout from "../components/layout";

const WorkPost = ({ data, 
                    // pageContext 
                    }) => {
  // const {breadcrumb: { crumbs }} = pageContext
    // const {markdownRemark} = data;
    // const {frontmatter, 
    //   // fields, 
    //   html} = markdownRemark;
    

    return (
      // <Layout>
      // <p>{data.html}</p>
      <span>
            <h1 className="smaller mb-5">{data.frontmatter.title}
            {data.frontmatter.subtitle ? 
                    (<span className="customSubheading"> <br/> {data.frontmatter.subtitle} </span>) 
                    : 
                    (
                    <></>
                        )
                    }
                    </h1>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: data.html }}
            >
            </div>
            <br/>
            <br/>
      </span>
      //{/* </Layout> */}
    );
}

export default WorkPost;

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