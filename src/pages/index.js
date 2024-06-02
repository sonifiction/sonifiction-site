import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Layout from "../components/layout";
import ThemeList from "../components/themeList";
import WorkPost from "../templates/workPost";
import lodash from "lodash";

const IndexPage = ({ pageContext }) => {

  // I want to query a specific render folder
  // Then loop through their subfolders looking for md and image files. 
  // Return the first of each.

  const data = useStaticQuery(graphql`
    {
 all: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/(render\/)/"  }}
    sort: {frontmatter: {date: DESC}}
  ) {
    nodes {
      fields {
        slug
      }
      frontmatter {
        subtitle
        title
        tags
        date(formatString: "ddd DD MMM yy")
      }
      id
      html

    }
  }
}
  `);


  // const themes = [{"name": 'Sound',"data": data.sound.nodes, "link": "/sound"}, 
  //                 {"name": 'Design',"data": data.design.nodes, "link": "/design"}, 
  //                 {"name": 'Research',"data": data.research.nodes, "link": "/research"}]
  // const works = (

  //   //loop through theme, give it a title and a list of things
  //   themes.map((theme)=> 
  //     (
  //       <ThemeList className={theme.name} theme={theme.name} data={theme.data} link={theme.link}></ThemeList>
  //       )
  //     )  
  //   )

  // myNodes =

  const works = data.all.nodes.map((post) => 
    <WorkPost data={post} ></WorkPost>
  // <p>{.html}</p>
)

const toc = data.all.nodes.map(post => ({
    content: post.frontmatter.title,
    link:('#'+ lodash.camelCase(post.frontmatter.title))
  }));

  return (
    <Layout name="Index" toc={toc}>
      <section>
        {works}
        </section>
      </Layout>
  );
};

export default IndexPage

export const Head = () => <title>Home Page</title>


