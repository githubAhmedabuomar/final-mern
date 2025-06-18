import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout.js";
import { useAuth } from "../context/authcontext.js";
import Usecategory from "../context/usecategory.js";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/Cartcontext.js";

const Home = () => {
  const [Auth, setAuth] = useAuth();
  const [page, setpage] = useState(1);
  const [count, setcount] = useState();
  const [loading, setloading] = useState(false);

  const [cart, setcart] = useCart();

  const categories = Usecategory();
  const [products, setproducts] = useState();
  const [checked, setchecked] = useState([]);

  const [radio, setradio] = useState();

  const addtocart = (p) => {
    console.log(cart);
    const nc = [...cart];
    const choosen = nc.find((i) => i._id === p._id);
    if (choosen) {
      choosen.number++;
      setcart(nc);

      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      setcart([...nc, p]);
      localStorage.setItem("cart", JSON.stringify([...cart, p]));
    }

    console.log(cart);
  };
  const getcount = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/getcount"
      );
      if (data) setcount(data.count);
      console.log(count, "count");
    } catch (error) {
      console.log(error);
    }
  };

  const getproductsperpage = async () => {
    try {
      setloading(true);
      const { data } = await axios.post(`/api/v1/product/productlist/${page}`);
      setloading(false);
      if (data) {
        setloading(false);
        console.log(products, "hh");
        setproducts(data.products);
      }
      console.log(products, "products per page");
    } catch (error) {
      console.log(error);
    }
  };
  const loadingon = async () => {
    if (page === 1) return;

    try {
      setloading(true);
      const { data } = await axios.post(`/api/v1/product/productlist/${page}`);

      if (data) {
        setloading(false);
        setproducts([...products, ...data?.products]);
        console.log(products, "loading");
      }
      console.log(products, "products loadingon");
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  const getfilteredproducts = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/getfilteredproducts", {
        checked,
        radio,
      });

      if (data && data.success) setproducts(data.products);
      console.log(data, "data from filtered");
    } catch (error) {
      console.log(error, "error from filtered");
      console.log(checked, radio, "error from filtered");
    }
  };
  useEffect(() => {
    getcount();
  }, []);
  useEffect(() => {
    if (!radio || !checked) getproductsperpage();
  }, [radio, checked]);
  useEffect(() => {
    if (radio?.length || checked?.length) getfilteredproducts();
  }, [radio?.length, checked?.length]);

  const [allprices, setallprices] = useState([
    { id: 0, name: "[$1 - $99]", value: [0, 99] },
    { id: 1, name: "[$100 - $199]", value: [100, 199] },
    { id: 2, name: "[$200 - $299]", value: [200, 299] },
  ]);
  const handlecheck = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setchecked(all);
    console.log(checked, "checked");
  };

  return (
    <>
      <Layout title="Mern E-commerce Home-page">
        <div className="row container-fluid">
          <div
            className="col col-md-3"
            style={{ borderRight: "1px solid black" }}
          >
            <div className="my-3">
              <h2>Filter by category</h2>
              {categories.map((c) => {
                return (
                  <div class="form-check" key={c._id}>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="checkDefault"
                      onChange={(e) => handlecheck(e.target.checked, c._id)}
                    />
                    <label class="form-check-label" for="checkDefault">
                      {c.name}
                    </label>
                  </div>
                );
              })}
            </div>
            <div>
              <h2>Filter by price</h2>
              {allprices.map((p) => {
                return (
                  <div class="form-check" key={p.id}>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="radioDefault"
                      id="radioDefault1"
                      value={p.value}
                      onChange={() => {
                        setradio(p.value);
                        console.log(radio, "radio");
                      }}
                    />
                    <label class="form-check-label" for="radioDefault1">
                      {p.name}
                    </label>
                  </div>
                );
              })}
            </div>
            <button
              className="btn btn-primary my-3"
              onClick={() => {
                window.location.reload();
              }}
            >
              Reset filters
            </button>
          </div>
          <div className="col col-md-9">
            <div className="row container-fluid">
              {products?.map((p) => {
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
                          <p>{p.description.substring(0, 20)}</p>
                          <h5 style={{ color: "teal" }}>{p.price}$</h5>
                        </div>
                      </NavLink>
                      <div className="d-flex justify-content-around align-items-center py-1">
                        <button
                          className="btn btn-success"
                          style={{ width: "49%" }}
                          onClick={() => {
                            addtocart({ ...p });
                          }}
                        >
                          Add to cart
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

            <div className="w-100 text-center my-3">
              {products && products.length < count && products.length > 0 && (
                <button
                  className="btn btn-success"
                  onClick={() => {
                    setpage(page + 1);
                    loadingon();
                  }}
                >
                  {loading ? "...loading" : "loadmore"}
                </button>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
