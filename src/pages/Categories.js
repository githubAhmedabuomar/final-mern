import React from "react";
import usecategory from "../context/usecategory.js";
import Layout from "../components/layout/Layout.js";

const Categories = () => {
  const categories = usecategory();
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          {categories?.map((c) => {
            return (
              <div className="col col-md-2">
                {" "}
                <a
                  href={`/categoryproducts/${c.slug}`}
                  style={{
                    fontSize: "20px",
                    color: "teal",
                    fontWeight: "bold",
                    textAlign: "center",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  className=" card border shadow my-3 ms-3 p-3"
                >
                  {c.name}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
