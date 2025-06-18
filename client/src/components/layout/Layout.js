import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { helmet } from "react-helmet";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="mern e commerce designed by abuelmaati"
        />
        <meta
          name="keywords"
          content="mern e commerce,mongo,express,node,reacr"
        />
        <meta name="author" content="abu elmaati" />
        <title>{title}</title>
      </helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "mern e commerce",
  description: "mern e commerce designed by abuelmaati",
  keywords: "mern e commerce,mongo,express,node,reacr",
  author: "abu elmaati",
};
export default Layout;
