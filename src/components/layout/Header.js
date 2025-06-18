import { useNavigate, navLink } from "react-router-dom";
import { useAuth } from "../../context/authcontext.js";
import usecategory from "../../context/usecategory.js";
import { useSearch } from "../../context/searchcontext.js";
import axios from "axios";
import Badge from "./badge.js";
import { useCart } from "../../context/Cartcontext.js";

const Header = () => {
  const [Auth, setAuth] = useAuth();
  const categories = usecategory();
  const navigate = useNavigate();
  const [value, setvalue] = useSearch();
  const [cart, setcart] = useCart();
  const lscart = JSON.parse(localStorage.getItem("cart"));
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const keyword = value.keyword;
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/product/getsearched/${keyword}`
      );
      if (data) setvalue({ ...value, results: data });
      navigate("/searchresults");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <nav
        class="navbar navbar-expand-lg bg-body-tertiary"
        style={{ minHeight: "10vh" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/" style={{ marginRight: "100px" }}>
            {" "}
            <h3>🛒 Mern E-commerce</h3>
          </a>
          {value?.products ? JSON.stringify(value.products[1].name) : ""}
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <form
            class="d-flex"
            role="search"
            style={{ marginRight: "100px" }}
            onSubmit={(e) => {
              handlesubmit(e);
            }}
          >
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => {
                setvalue({ ...value, keyword: e.target.value });
                console.log(value, "value");
                console.log(value.keyword, "value keyword");
              }}
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>

              {!localStorage.getItem("auth") && (
                <li class="nav-item">
                  <a class="nav-link" href="/login">
                    login
                  </a>
                </li>
              )}
              {!localStorage.getItem("auth") && (
                <li class="nav-item">
                  <a class="nav-link" href="/register">
                    Register
                  </a>
                </li>
              )}
              {localStorage.getItem("auth") && (
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {Auth?.user?.name}
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <a
                        class="dropdown-item"
                        href={
                          Auth?.user?.role === 1
                            ? "/dashboard/admin"
                            : "/dashboard/user"
                        }
                      >
                        Dashboard
                      </a>
                    </li>
                    {localStorage.getItem("auth") && (
                      <li>
                        <a
                          class="dropdown-item"
                          href="#"
                          onClick={() => {
                            localStorage.removeItem("auth");
                            // window.location.reload();
                            navigate("/register");
                          }}
                        >
                          logout
                        </a>
                      </li>
                    )}
                  </ul>
                </li>
              )}
              {Auth?.token ? (
                <li className="dropdown">
                  <button
                    class="nav-item dropdown dropdown-toggle btn btn-secondary"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categories
                  </button>
                  <ul class="dropdown-menu text-center">
                    <li
                      style={{ borderBottom: "1px solid black" }}
                      className="dropdown-item"
                    >
                      {" "}
                      <a href="/categories" style={{ textDecoration: "none" }}>
                        All categories
                      </a>
                    </li>

                    {categories?.map((c) => {
                      return (
                        <a
                          style={{ textDecoration: "none" }}
                          href={`/categoryproducts/${c.slug}`}
                          key={c.name}
                        >
                          <button class="dropdown-item" type="button">
                            {c.name}
                          </button>
                        </a>
                      );
                    })}
                  </ul>
                </li>
              ) : (
                ""
              )}
              {Auth?.token ? (
                <li class="nav-item d-flex justify-content-center align-items-center">
                  <a class="nav-link active" aria-current="page" href="/cart">
                    Cart
                  </a>
                  {<Badge value={lscart ? lscart.length : cart?.length} />}
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
