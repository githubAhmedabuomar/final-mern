import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenue from "./AdminMenue";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/authcontext";

const Updateproduct = () => {
  const [category, setcategory] = useState();
  const [id, setid] = useState();
  const [photo, setphoto] = useState();
  const [name, setname] = useState();
  const [description, setdescription] = useState();
  const [price, setprice] = useState();
  const [quantity, setquantity] = useState();
  const [shipping, setshipping] = useState();

  const navigate = useNavigate();
  const [auth] = useAuth();
  const [categories, setcategories] = useState();
  // const [product,setproduct]=useState();
  const { slug } = useParams();
  console.log(slug, "slug");
  const getsingleproduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/getsingleproduct/${slug}`
      );

      if (data) {
        setname(data.product.name);
        setcategory(data.product.category._id);
        setdescription(data.product.description);
        setprice(data.product.price);
        setshipping(data.product.shipping);
        setquantity(data.product.quantity);
        setid(data.product._id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(photo, "photo before");
    getsingleproduct();
  }, []);

  const getallcategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/getallCategories");
      if (data && data.success) setcategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getallcategories();
  }, []);

  const Updateproduct = async (e) => {
    e.preventDefault();
    try {
      const productdata = new FormData();
      productdata.append("name", name);
      productdata.append("price", price);
      productdata.append("quantity", quantity);
      productdata.append("description", description);
      productdata.append("shipping", shipping);
      productdata.append("photo", photo);
      productdata.append("category", category);
      productdata.append("id", id);

      const { data } = await axios.put(
        `/api/v1/product/updateproduct`,
        productdata,
        { headers: { Authorization: auth?.token } }
      );
      if (data) toast.success("product updated successfully");
      console.log(photo, "photo from update");
      console.log(category, "category");
      console.log(categories, "categories");
      // console.log(product._id,"productid")
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("some thing went wrong while updating product");
      // console.log(product._id,"data")
    }
  };
  const deleteproduct = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(
        `/api/v1/product/deleteproduct/${id}`,
        {
          headers: { Authorization: auth?.token },
        }
      );
      if (data) toast.success("product deleted succesfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("error in deleting");
    }
  };

  return (
    <Layout title="update product page">
      <div className="container-fluid">
        <div className="row">
          <div className="col col-md-3">
            <AdminMenue />
          </div>
          <div className="col col-md-9  my-5">
            <input
              type="text"
              hidden
              value={id}
              onChange={(e) => {
                setid(e.target.value);
              }}
            />
            <form>
              <select
                onChange={(e) => {
                  setcategory(e.target.value);
                }}
                style={{ outline: "none" }}
                className="mb-3 w-75 d-block text-center border shadow p-2"
              >
                {/* <option  className='p-4' hidden>select product category</option> */}
                {categories?.map((c) => {
                  return (
                    <option
                      selected={c._id == category}
                      name={c._id}
                      key={c._id}
                      className="p-2"
                      value={c._id}
                    >
                      {c.name}
                    </option>
                  );
                })}
              </select>
              {/* <h2 className='text-center w-75'>{category?"category":category.slug}</h2> */}
              <label className="btn btn-secondary w-75">
                {photo ? photo.name : "uploadphoto"}
                <input
                  type="file"
                  hidden
                  name="photo"
                  onChange={(e) => {
                    setphoto(e.target.files[0]);
                    console.log(photo, "photo after");
                  }}
                  accept="image/*"
                ></input>
              </label>
              {photo ? (
                <div className="w-75 my-3 d-flex justify-content-center align-items-center">
                  <img
                    style={{ width: "50%", height: "50% " }}
                    src={
                      photo
                        ? URL.createObjectURL(photo)
                        : `http://localhost:8080/api/v1/product/getproductphoto/${id}`
                    }
                  ></img>
                </div>
              ) : (
                ""
              )}
              ;
              <input
                value={name}
                name="name"
                type="text"
                onChange={(e) => {
                  setname(e.target.value);
                }}
                className="text-center d-block border shadow w-75 my-2 p-2 form-control"
              />
              <textarea
                value={description}
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
                placeholder="enter product description....."
                className="form-control w-75 shadow text-center p-2 my-2"
              ></textarea>
              <input
                type="number"
                placeholder="enter product quantity..."
                value={quantity}
                onChange={(e) => {
                  setquantity(e.target.value);
                }}
                className="w-75 shadow text-center p-2 my-2 form-control"
              />
              <input
                type="number"
                placeholder="enter product price..."
                value={price}
                onChange={(e) => {
                  setprice(e.target.value);
                }}
                className="w-75 shadow text-center my-2 form-control"
              />
              <select
                value={shipping}
                onChange={(e) => {
                  setshipping(e.target.value);
                }}
                className="w-75 shadow text-center d-block form-control my-2 p-2"
              >
                <option hidden>choose shipping state</option>
                <option value={true}>true</option>
                <option value={false}>false</option>
              </select>
              <div className="w-75 d-flex justify-content-center align-items-center">
                <button
                  onClick={(e) => Updateproduct(e)}
                  className="btn btn-warning me-3"
                  style={{ width: "30%" }}
                >
                  update product
                </button>
                <button
                  onClick={(e) => {
                    deleteproduct(e);
                  }}
                  style={{ width: "30%" }}
                  className="btn btn-danger"
                >
                  Delete product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Updateproduct;
