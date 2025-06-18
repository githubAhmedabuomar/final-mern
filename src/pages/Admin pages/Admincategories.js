import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenue from "./AdminMenue";
import CreateCategoryform from "./createCategoryform.js";

import { useAuth } from "../../context/authcontext.js";
import Usecategory from "../../context/usecategory.js";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Admincategories = () => {
  const [visible, setvisible] = useState(false);
  const [newname, setnewname] = useState();
  const [id, setid] = useState();
  const handleupdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/updateCategory/${id}`,
        { newname },
        {
          headers: { Authorization: auth?.token },
        }
      );
      if (data) setvisible(!visible);
      window.location.reload();
      toast.success("category updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("error in updating category");
    }
  };
  const categories = Usecategory();
  const handledelete = async (name) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/deleteCategory/${name}`
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const [auth] = useAuth();

  return (
    <Layout>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "rgb(189, 189, 214 ,.7)",
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "20",
          visibility: visible ? "visible" : "hidden",
        }}
        onClick={(e) => {
          console.log(e.target.className);
          if (e.target.id == "inputt" || e.target.id == "btnn") {
            console.log(e.target.className);
          } else {
            setvisible(!visible);
          }
        }}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="w-50 p-2">
          <form className="w-100 text-center">
            <input
              type="text"
              id="inputt"
              className="w-100 text-center py-2"
              placeholder="enter category new name..."
              autoComplete="off"
              style={{ outline: "none" }}
              value={newname}
              onChange={(e) => {
                setnewname(e.target.value);
              }}
            />
            <button
              onClick={(e) => {
                handleupdate(e);
              }}
              className="btn btn-primary w-15 my-2"
              id="btnn"
            >
              update
            </button>
          </form>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenue />
          </div>
          <div className="col-md-9">
            <div className="container-fluid mt-5">
              <CreateCategoryform />

              <div className="row">
                {categories.length > 0 ? (
                  <h1 className="text-center">All categories</h1>
                ) : (
                  ""
                )}
                {categories.map((c) => {
                  return (
                    <div className="col col-md-3">
                      <div className=" border p-1 shadow card mt-2">
                        <NavLink
                          style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            textDecoration: "none",
                          }}
                          className="text-center py-3"
                        >
                          {c.name}{" "}
                        </NavLink>
                        <div className="w-100 d-flex justify-content-between py-1">
                          <button
                            className="btn btn-warning"
                            style={{ width: "49%" }}
                            onClick={(e) => {
                              setvisible(!visible);
                              setnewname(c.name);
                              setid(c._id);
                            }}
                          >
                            Update
                          </button>

                          <button
                            style={{ width: "49%" }}
                            onClick={() => handledelete(c.name)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admincategories;
