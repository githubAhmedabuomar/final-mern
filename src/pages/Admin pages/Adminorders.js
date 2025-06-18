import React from "react";
import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react";

import { useAuth } from "../../context/authcontext";
import axios from "axios";
import { NavLink } from "react-router-dom";
import AdminMenue from "./AdminMenue";

const Adminorders = () => {
  const [auth, setauth] = useAuth();

  console.log(auth);
  const [orders, setorders] = useState([]);
  const [status, setstatus] = useState([
    "notprocessing",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ]);
  const [products, setproducts] = useState([]);

  const getuserorders = async () => {
    try {
      const { data } = await axios.get(`/api/v1/auth/getadminorders`, {
        headers: { Authorization: auth?.token },
      });
      if (data) setorders([...data.orders]);

      console.log(orders, "data");
      // console.log([...data.orders], "data");
    } catch (error) {
      console.log(error, "errorddd");
    }
  };
  const changingstatus = async (value, id) => {
    try {
      const { data } = await axios.post(
        `/api/v1/auth/updateorderstatus/${id}`,

        { status: value },
        {
          headers: { Authorization: auth?.token },
        }
      );
      getuserorders();
    } catch (error) {
      console.log(error, "errorddd");
    }
  };
  useEffect(() => {
    getuserorders();
  }, [auth, status]);
  return (
    <>
      <Layout>
        <div className="container fluid">
          <div className="row">
            <div className="col col-md-3">
              <AdminMenue />
            </div>
            <div className="col col-md-9">
              {orders.length > 0 && (
                <h1 className="text-center py-2">
                  Hello {auth?.user.name} Here is your order
                </h1>
              )}
              <div className=" ">
                {orders?.map((o, i) => {
                  return (
                    <div>
                      <table className="table border shadow">
                        <thead className="shadow border">
                          <td className="text-center py-2">Index</td>
                          <td className="text-center py-2">Buyer</td>
                          <td className="text-center py-2">Amount</td>
                          <td className="text-center py-2">Status</td>
                          <td className="text-center py-2">Total price</td>
                          <td className="text-center py-2">Payment</td>
                        </thead>
                        <tbody className="table border shadow">
                          <th className="text-center py-2">{i + 1}</th>
                          <th className="text-center py-2">{o.buyer.name}</th>
                          <th className="text-center py-2">
                            {o.products.length}
                          </th>
                          <th className="text-center py-2">
                            <select
                              border={false}
                              defaultValue={o?.status}
                              onChange={(e) => {
                                changingstatus(e.target.value, o._id);
                              }}
                            >
                              {status.map((s, i) => {
                                return (
                                  <option key={i} value={s}>
                                    {s}
                                  </option>
                                );
                              })}
                            </select>
                          </th>
                          <th className="text-center py-2">{o.total}</th>
                          <th className="text-center py-2">not yet</th>
                        </tbody>
                      </table>
                      <h1 className="text-center">your products</h1>
                      <div className="row my-3">
                        {o?.products?.map((p) => {
                          return (
                            <div className="col col-md-4 gy-3">
                              <div className="card shadow border text-center">
                                <NavLink
                                  to={`/singleproduct/${p.slug}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "black",
                                  }}
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
                                    <h5 style={{ color: "teal" }}>
                                      {p.price}$
                                    </h5>
                                  </div>
                                </NavLink>

                                <img></img>
                              </div>
                            </div>
                          );
                        })}
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

export default Adminorders;
