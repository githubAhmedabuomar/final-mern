import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";

const Singleproduct = () => {
  const [product, setproduct] = useState();
  const params = useParams();
  console.log(params, "params");
  const [similarproducts, setsimilarproducts] = useState([]);
  const getsimilarproducts = async () => {
    {
      try {
        const { data } = await axios.get(
          `/api/v1/product/getsimilarproducts/${params.slug}`
        );
        if (data) setsimilarproducts(data.products);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getsingleproduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/getsingleproduct/${params.slug}`
      );
      if (data) setproduct(data.product);
      console.log(product, "product");
      // console.log(typeof data,"datatype")
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getsingleproduct();
  }, []);
  return (
    <>
      <Layout>
        <div className="container-fluid">
          <div className="row">
            <div
              className="col col-md-6 d-flex justify-content-center align-items-center"
              style={{ textAlign: "center", marginTop: "10PX" }}
            >
              <div
                style={{ width: "300px", height: "250px", background: "red" }}
              >
                <img
                  style={{ width: "400px", height: "250px" }}
                  src={`/api/v1/product/getproductphoto/${product?._id}`}
                ></img>
              </div>
            </div>
            <div className="col col-md-6 d-flex justify-content-center align-items-center">
              <div className="w-100">
                <div className="card border shadow text-center my-2 w-100">
                  <h2>{product?.name}</h2>
                </div>
                <div className="card border shadow text-center my-2">
                  <h4 style={{ color: "teal" }}>{product?.description}</h4>
                </div>
                <div className="card border shadow text-center my-2">
                  <h3 style={{ color: "green" }}>price: {product?.price} $</h3>
                </div>

                <div className=" my-2 d-flex justify-content-between align-items-center">
                  <button className="btn btn-primary" style={{ width: "30%" }}>
                    Order
                  </button>
                  <button className="btn btn-primary" style={{ width: "30%" }}>
                    Add to favourite
                  </button>
                  <button
                    onClick={() => {
                      getsimilarproducts();
                    }}
                    className="btn btn-primary"
                    style={{ width: "30%" }}
                  >
                    Similar products
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="row">
            {similarproducts.length > 0 && (
              <h2 className="text-center">Similar products</h2>
            )}

            {similarproducts?.map((p) => {
              return (
                <div className="col col-md-4 gy-3">
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
        </div>
      </Layout>
    </>
  );
};

export default Singleproduct;
