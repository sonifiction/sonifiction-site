import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import "../style/bulmacustom.scss"
import "@fortawesome/fontawesome-free/css/all.min.css";
import Layout from "../components/layout.js";
import { Link } from "gatsby";

const InfoPage = ({pageContext}) => {
  const {
    breadcrumb: { crumbs },
  } = pageContext
    const data = useStaticQuery(graphql`
      {
        about: markdownRemark(
          fields: { category: { eq: "about" } }
          fileAbsolutePath: { regex: "/about-long.md/" }
        ) {
          html
          frontmatter {
            title
          }
        }
      }
    `);

  return (
    <Layout name="about" crumbs={crumbs}>
      <h1 className="smaller mb-5">Info</h1>
        <div
          className="content my-0"
          dangerouslySetInnerHTML={{ __html: data.about.html }}
        ></div>

        {/* TODO: Make relative links work to the rest of my pages! CV, etc etc... */}
        {/* <div className=".notMarkdown block">
          <p>Here are some links you might find useful: </p>
          <Link className=".notMarkdown">what I'm currently working on (my PhD)</Link>
          <Link>Here's some things I have worked on (my CV)</Link>
          </div> */}
    </Layout>
  );
}

export default InfoPage

export const Head = () => <title>Info</title>
