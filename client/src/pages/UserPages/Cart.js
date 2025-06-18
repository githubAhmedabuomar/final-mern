import Layout from "../../components/layout/Layout";
import { useCart } from "../../context/Cartcontext";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authcontext";
import { useEffect, useState } from "react";
import axios from "axios";
// import DropIn from "braintree-web-drop-in-react";

import toast from "react-hot-toast";

const Cart = () => {
  // const [instance, setinstance] = useState("");

  const handlebuy = async () => {
    try {
      setloading(true);
      // const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/product/braintree/payment`,
        {
          cart,
          total,
        },
        {
          headers: { Authorization: auth?.token },
        }
      );

      setloading(false);
      localStorage.removeItem("cart");
      setcart([]);
      navigate("/dashboard/user/orders");
      toast.success("payment completed successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const [cart, setcart] = useCart();
  const navigate = useNavigate();
  const cartt = [...cart];
  const [auth, setauth] = useAuth();
  const Delete = (id) => {
    try {
      const ncart = cart.filter((i) => i._id != id);
      setcart(ncart);
      console.log(cart);
      localStorage.setItem("cart", JSON.stringify(ncart));
    } catch (error) {
      console.log(error);
    }
  };
  let total = 0;
  const tp = cart.map((i) => {
    total = i.price + total;
  });

  const [clientToken, setclientToken] = useState("");
  const [loading, setloading] = useState(false);
  // const getToken = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       "http://localhost:8080/api/v1/product/braintree/token"
  //     );
  //     if (data) setclientToken(data.clientToken);
  //     console.log(data.clientToken);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getToken();
  // }, [auth?.token]);
  return (
    <>
      <Layout>
        <div className="container-fluid">
          <div className="row">
            <h1 className="text-center my-3">Hello {auth?.user?.name}</h1>
            <div className="col col-md-6 d-flex justify-content-between flex-wrap gap-2">
              {cartt?.map((p) => {
                // console.log(p);
                return (
                  <div key={p._id} style={{ width: "32%" }}>
                    <div className="card shadow border text-center">
                      <NavLink
                        to={`/singleproduct/${p.slug}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <div>
                          <img
                            src={`http://localhost:8080/api/v1/product/getproductphoto/${p._id}`}
                            style={{
                              width: "95%",
                              height: "155px",
                              marginTop: "5px",
                            }}
                          ></img>
                          <hr></hr>
                          <h4>{p.name}</h4>
                          <p>{p.description}</p>
                          <p>{p.number}</p>
                          <h4 style={{ color: "teal" }}>{p.price}$</h4>
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
                          onClick={() => {
                            Delete(p._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                      <img></img>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col col-md-6">
              <h4 className="text-center">checkout | Total | Payment</h4>
              <hr></hr>
              <h4 className="text-center">
                Total price : {total ? total + "$" : ""}
              </h4>
              <hr></hr>
              <h4 style={{ display: "inline" }}>
                {auth?.user ? "Address: " : ""}
                <p style={{ display: "inline" }}>{auth?.user?.address}</p>

                {auth.token ? (
                  <button
                    onClick={() => {
                      navigate("/dashboard/user/userprofile");
                    }}
                    className="btn btn-danger ms-4"
                  >
                    update address
                  </button>
                ) : (
                  <button className="btn btn-warning w-100 ">
                    login tocheckup
                  </button>
                )}
              </h4>
              <hr></hr>
              <div className="my-2 text-center">
                <div>
                  {/* <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: { flow: "vault" },
                    }}
                    onInstance={(instanse) => setinstance(instanse)}
                  /> */}

                  <button
                    disabled={cart.length < 1 ? true : false}
                    className="btn btn-primary"
                    onClick={handlebuy}
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Cart;
