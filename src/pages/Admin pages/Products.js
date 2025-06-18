import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenue from "./AdminMenue";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/authcontext.js";
const Products = () => {
  const [products, setproducts] = useState();
  const [auth] = useAuth();
  const navigate = useNavigate();

  const getallproducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/getallProducts");
      if (data && data.success) setproducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getallproducts();
    console.log(products);
  }, []);
  const deleteproduct = async (id) => {
    console.log(id);
    try {
      const { data } = await axios.delete(
        `/api/v1/product/deleteproduct/${id}`,
        {
          headers: { Authorization: auth?.token },
        }
      );
      if (data) toast.success("product deleted succesfully");
      navigate("/dashboard/admin/products");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("error in deleting");
    }
  };

  return (
    <>
      <Layout>
        <div className="container-fluid">
          <div className="row">
            <div className="col col-md-3">
              <AdminMenue />
            </div>
            <div className="col col-md-9 text-center">
              <h1 className="my-4">All products</h1>
              <div className="row gy-2">
                {products?.map((p) => {
                  return (
                    <div className=" py-2 col col-md-3">
                      <div className="card shadow border">
                        <NavLink
                          to={`/dashboard/admin/updateproduct/${p.slug}`}
                          style={{ textDecoration: "none" }}
                        >
                          <div>
                            <div>
                              <img
                                style={{
                                  width: "95%",
                                  height: "170px",
                                  paddingTop: "4px",
                                }}
                                src={`/api/v1/product/getproductphoto/${p._id}`}
                              ></img>
                            </div>
                            <hr></hr>
                            <h3>{p.name.substring(0, 15)}..</h3>
                            <p>{p?.description.substring(0, 30)}</p>
                          </div>
                        </NavLink>
                        <button
                          onClick={() => {
                            deleteproduct(p._id);
                          }}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Products;
