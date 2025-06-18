import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/authcontext.js";
import axios from "axios";
import Spinner from "../components/layout/Spinner.js";

const PrivateRoute = () => {
  const [ok, setok] = useState(false);
  const [Auth, setAuth] = useAuth();
  useEffect(() => {
    const checkuser = async () => {
      const res = await axios.get("/api/v1/auth/userAuth", {
        headers: { Authorization: Auth?.token },
      });

      if (res.data.ok) {
        setok(true);
      } else {
        setok(false);
      }
    };
    if (Auth?.token) checkuser();
  }, [Auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
  // return <Spinner/>
};

export default PrivateRoute;
