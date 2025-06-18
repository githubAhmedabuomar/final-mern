import Layout from "../components/layout/Layout.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { useAuth } from "../context/authcontext.js";

const ForgotPassword = () => {
  const [Auth, setAuth] = useAuth();
  const [email, setemail] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [answer, setanswer] = useState("");
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/v1/auth/forgotpassword", {
        email,
        answer,
        newpassword,
      });

      if (res && res.data.success) {
        toast.success("password updated successfully");
        console.log(res);

        setAuth({ ...Auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/login");
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
      <Layout title="Mern E-commerce forgot password-page">
        <div className="registerForm">
          <h1>updatepasword form</h1>
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
              value={answer}
              onChange={(e) => {
                setanswer(e.target.value);
              }}
              type="text"
              name="answer"
              placeholder="enter your answer"
            />

            <input
              required
              value={newpassword}
              onChange={(e) => {
                setnewpassword(e.target.value);
              }}
              type="text"
              name="newpassword"
              placeholder="enter your newpassword"
            />

            <button className="btn btn-primary">UpdatePassword</button>

            <h6 className="mt-3 ">
              Donot have account?
              <span className="ms-2 btn btn-outline-primary">
                <a style={{ textDecoration: "none" }} href="/register">
                  register
                </a>
              </span>{" "}
            </h6>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default ForgotPassword;
