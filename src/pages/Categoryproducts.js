import { NavLink, useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

const Categoryproducts = () => {
  const params = useParams();
  console.log(params);
  const [products, setproducts] = useState([]);
  const [category, setcategory] = useState();
  console.log(products);
  const getproducts = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/getcategoryproducts/${params.slug}`
      );
      if (data) setproducts(data?.products);
      if (data) setcategory(data?.category);
      console.log(data, "data from cp");
    } catch (error) {
      console.log(error, "errorbb");
    }
  };

  useEffect(() => {
    if (params.slug) getproducts();
  }, []);
  return (
    <>
      <Layout>
        <div className="row container-fluid">
          <h1 className="text-center" style={{ color: "teal" }}>
            {category?.name}{" "}
            <span style={{ color: "black" }}>category products</span>
          </h1>
          {products?.map((p) => {
            return (
              <div className="col col-md-3 gy-3">
                <div className="card shadow border text-center">
                  <NavLink
                    to={`/singleproduct/${p.slug}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div>
                      <img
                        src={`/api/v1/product/getproductphoto/${p._id}`}
                        style={{
                          width: "95%",
                          height: "155px",
                          marginTop: "5px",
                        }}
                      ></img>
                      <hr></hr>
                      <h4>{p.name}</h4>
                      <p>{p.description}</p>
                      <h5 style={{ color: "teal" }}>{p.price}$</h5>
                    </div>
                  </NavLink>
                  <div className="d-flex justify-content-around align-items-center py-1">
                    <button
                      className="btn btn-success"
                      style={{ width: "49%" }}
                    >
                      Order
                    </button>
                    <button
                      className="btn btn-warning "
                      style={{ width: "49%" }}
                    >
                      Add to favourites
                    </button>
                  </div>
                  <img></img>
                </div>
              </div>
            );
          })}
        </div>
      </Layout>
    </>
  );
};

export default Categoryproducts;
