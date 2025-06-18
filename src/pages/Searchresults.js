import { NavLink } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/searchcontext";

const Searchresults = () => {
  const [value, setvalue] = useSearch();
  return (
    <>
      <Layout>
        <h1 className="text-center">Search Results</h1>
        <div className="row gy-2">
          {value.results.length < 1 && (
            <h2 className="text-center">no results</h2>
          )}
          {value?.results?.map((p) => {
            return (
              <div className="col col-md-3">
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

export default Searchresults;
