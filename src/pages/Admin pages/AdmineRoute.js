import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Spinner from "../../components/layout/Spinner";
import { useAuth } from "../../context/authcontext";
import axios from "axios";
import { Outlet } from "react-router-dom";

const AdmineRoute = () => {
  const [ok, setok] = useState(true);
  const [auth, setauth] = useAuth();
  useEffect(() => {
    const admincheck = async () => {
      try {
        const res = await axios.get("/api/v1/auth/adminAuth", {
          headers: { Authorization: auth?.token },
        });

        if (res.data.ok) {
          console.log(res, "res from authadmin");
          setok(true);
        } else {
          setok(false);
          console.log(res, "res from authadmin");
        }
        console.log(ok, "ok");
        console.log(auth.token, "auth.token");
      } catch (error) {}
    };
    if (auth?.token) admincheck();
  }, [auth?.token]);

  return !ok ? <Outlet /> : <Spinner />;
};

export default AdmineRoute;
