import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Layout from "../components/layout";
import ThemeList from "../components/themeList";


const Sound = ({ pageContext }) => {
  const data = useStaticQuery(graphql`
  {
  sound: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/(sound\/)/"  }}
    sort: {frontmatter: {date: DESC}}
  ) {
    nodes {
      fields {
        slug
      }
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(
              height: 35
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              )
          }
          id
        }
        tags
        date(formatString: "ddd DD MMM yy")
      }
      id
    }
  }


}
  `);

  const theme = {name:"sound", data: data.sound.nodes}
  return (
    <Layout name="Index">
      <section>
        <ThemeList theme={theme.name} data={theme.data}></ThemeList>
        </section>
      </Layout>
  );
};

export default Sound


export const Head = () => <title>Sound</title>



