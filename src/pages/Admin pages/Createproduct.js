import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenue from "./AdminMenue";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authcontext";
// import Usecategory from '../../context/usecategory.js';

const Createproduct = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [categories, setcategories] = useState();
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
  const handlesubmit = async (e) => {
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

      const { data } = await axios.post(
        "/api/v1/product/createProduct",
        productdata,
        { headers: { Authorization: auth?.token } }
      );
      if (data && data.success) toast.success("product created successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("some thing went wrong while cretaing product");
    }
  };
  const [category, setcategory] = useState();
  const [photo, setphoto] = useState();
  const [name, setname] = useState();
  const [description, setdescription] = useState();
  const [price, setprice] = useState();
  const [quantity, setquantity] = useState();
  const [shipping, setshipping] = useState();

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col col-md-3">
            <AdminMenue />
          </div>
          <div className="col col-md-9  my-5">
            <form
              onSubmit={(e) => {
                handlesubmit(e);
              }}
            >
              <select
                onChange={(e) => {
                  setcategory(e.target.value);
                }}
                style={{ outline: "none" }}
                className="mb-3 w-75 d-block text-center border shadow p-2"
              >
                <option className="p-4" hidden>
                  select product category
                </option>
                {categories?.map((c) => {
                  return (
                    <option key={c._id} className="p-2" value={c._id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
              <label className="btn btn-secondary w-75">
                {photo ? photo.name : "uploadphoto"}
                <input
                  type="file"
                  hidden
                  className=""
                  name="photo"
                  onChange={(e) => {
                    setphoto(e.target.files[0]);
                  }}
                  accept="image/*"
                ></input>
              </label>
              {photo ? (
                <div className="w-75 p-5">
                  <img
                    style={{ width: "100%", height: "100% " }}
                    src={URL.createObjectURL(photo)}
                  ></img>
                </div>
              ) : (
                ""
              )}

              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
                placeholder="enter product name...."
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
              <div className="w-75 text-center">
                <button className="btn btn-primary">Create product</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Createproduct;
