import { useAuth } from "../../context/authcontext.js";
import { NavLink, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Usermenue from "./usermenue.js";
const UserProfile = () => {
  const [auth, setauth] = useAuth();

  const [name, setname] = useState(auth?.user?.name);

  const [password, setpassword] = useState(auth?.user?.password);
  const [address, setaddress] = useState(auth?.user?.address);
  const [phone, setphone] = useState(auth?.user?.phone);
  const [age, setage] = useState(auth?.user?.age);
  const [answer, setanswer] = useState(auth?.user?.answer);
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const email = auth.user.email;

      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/updateuser",
        { name, email, password, address, phone, age, answer }
      );

      if (res && res.data.success) {
        console.log(res, "res");
        toast.success("profile updated successfully");
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/dashboard/user");
      } else {
        console.log(res.data.mess);
        toast.error(res.data.mess);
      }
    } catch (error) {
      // console.log(error)
    }
  };
  return (
    <>
      <Layout>
        <div style={{ minHeight: "70vh" }}>
          <div className="row">
            <div className="col col-md-3 ps-5">
              <Usermenue />
            </div>
            <div className="col col-md-9">
              <div className="registerForm">
                <h1>UserProfile</h1>
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
                    disabled
                    value={auth?.user?.email}
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
                  <button className="btn btn-primary">Update profile</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserProfile;
