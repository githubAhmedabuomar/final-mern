import Layout from "../components/layout/Layout.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { useAuth } from "../context/authcontext.js";

const Login = () => {
  const [Auth, setAuth] = useAuth();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      if (res && res.data.success) {
        toast.success("login successfully");
        console.log(res.data.user);

        setAuth({ ...Auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        console.log(res);
      }
    } catch (error) {
      // toast.error(error.response.data.mess,"error")
      console.log(error);
    }
  };
  return (
    <>
      <Layout title="Mern E-commerce Login-page">
        <div className="registerForm">
          <h1>Login Form</h1>
          <form
            onSubmit={(e) => {
              handlesubmit(e);
            }}
          >
            <input
              required
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              type="text"
              name="email"
              placeholder="enter your email"
            />

            <input
              required
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              type="text"
              name="password"
              placeholder="enter your password"
            />

            <button className="btn btn-primary">login</button>
            <button
              className="btn btn-primary"
              style={{ marginLeft: "10px" }}
              onClick={(e) => {
                e.preventDefault();
                navigate("/forgotPassword");
              }}
            >
              Forgot Password
            </button>
            <h6 className="mt-3 ">
              Donot have account?
              <span className="ms-2 btn btn-primary">
                <a
                  className="p-0 btn btn-primary"
                  style={{ textDecoration: "none" }}
                  href="/register"
                >
                  register
                </a>
              </span>
            </h6>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Login;
