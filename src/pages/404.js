import React from "react";
import Layout from "../components/layout";

const NotFoundPage = () => {
  return (
    <Layout name="Index">
      <section>
        <h1 className="is-uppercase bigTitle">404 – </h1>
        <p className="is-uppercase bigTitle"> 
          Sorry 😔, This page doesn't exist.<br />
          {process.env.NODE_ENV === "development" ? (
              <>
                <br />
                Try creating a page in <code>src/pages/</code>.
                <br />
              </>
            ) : null}
            <br />
            </p>
        </section>
      </Layout>
  );
};

export default NotFoundPage

export const Head = () => <title>Not found</title>
