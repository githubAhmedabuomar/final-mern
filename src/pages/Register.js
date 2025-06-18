import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");
  const [age, setage] = useState("");
  const [answer, setanswer] = useState("");
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        address,
        phone,
        age,
        answer,
      });

      if (res && res.data.success) {
        toast.success("successful registeration");
        navigate("/login");
      } else {
        console.log(res.data.mess);
        toast.error(res.data.mess);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Layout title="Mern E-commerce Register-page">
        <div className="registerForm">
          <h1>Register Form</h1>
          <form
            onSubmit={(e) => {
              handlesubmit(e);
            }}
          >
            <input
              required
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
              type="text"
              name="name"
              placeholder="enter your name"
            />
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
              value={phone}
              onChange={(e) => {
                setphone(e.target.value);
              }}
              type="text"
              name="phone"
              placeholder="enter your phone"
            />
            <input
              required
              value={address}
              onChange={(e) => {
                setaddress(e.target.value);
              }}
              type="text"
              name="address"
              placeholder="enter your address"
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
            <input
              required
              value={age}
              onChange={(e) => {
                setage(e.target.value);
              }}
              type="text"
              name="age"
              placeholder="enter your age"
            />
            <input
              required
              value={answer}
              onChange={(e) => {
                setanswer(e.target.value);
              }}
              type="text"
              name="answer"
              placeholder="what is your favourite footballplayer?"
            />
            <button className="btn btn-primary">Register</button>
          </form>
          <h6>
            have account?
            <span className="ms-2">
              <a
                className=" btn btn-primary"
                href="/login"
                style={{ textDecoration: "none" }}
              >
                login
              </a>
            </span>{" "}
          </h6>
        </div>
      </Layout>
    </>
  );
};

export default Register;
