import usermodel from "../models/usermodel.js";
import { hashedpass, comparepassword } from "../helpers/authhelpers.js";
import jwt from "jsonwebtoken";
import Ordermodel from "../models/Ordermodel.js";

export const registercontroller = async (req, res, next) => {
  try {
    const { name, email, password, address, phone, answer } = req.body;

    if (!name) res.send({ mess: "please enter the name" });
    if (!email) res.send({ mess: "please enter the email" });
    if (!password) res.send({ mess: "please enter the password" });
    if (!phone) res.send({ mess: "please enter the phone" });
    if (!address) res.send({ mess: "please enter the address" });
    const excistinguser = await usermodel.findOne({ email });
    if (excistinguser) {
      return res
        .status(201)
        .send({ mess: "the user is used before ,please login" });
    } else {
      const hashed = await hashedpass(password);
      const user = await new usermodel({
        name: name,
        answer: answer,
        email: email,
        password: hashed,
        address: address,
        phone: phone,
      }).save();
      res.status(200).send({
        success: true,
        user,
        message: "user created",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const logincontroller = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) res.send({ mess: "email is required" });
    if (!password) res.send({ mess: "password is required" });
    const user = await usermodel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({ mess: "user not found incorrect email" });
    } else {
      console.log("same", "sameee");
      console.log(user.name, "userrrr");
      const same = await comparepassword(password, user.password);

      console.log(same, "same");
      if (!same) {
        return res.status(200).send({ mess: "incorrect password" });
      } else {
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign({ _id: user._id }, secret, { expiresIn: "7d" });
        res.status(200).send({
          success: true,
          user: {
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
            phone: user.phone,
            address: user.address,
            age: user.age,
            answer: user.answer,
            id: user._id,
          },
          token,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      mess: "error in login",
      error,
    });
  }
};
export const getdata = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await usermodel.findOne({ email: email });
    if (user) return res.status(200).send({ user });
  } catch (error) {
    console.log(error);
  }
};
export const getdata2 = async (req, res, next) => {
  try {
    return res.status(200).send({ mess: "u r admin", ok: true });
  } catch (error) {
    console.log(error);
  }
};
export const forgotpasswordcontroller = async (req, res, next) => {
  try {
    const { answer, email, newpassword } = req.body;

    const user = await usermodel.findOne({ email, answer });

    if (!user) {
      return res.status(300).send({ mess: "wrong email" });
    }
    // if(user.address != address){return res.status(300).send({mess:"incorrect answer"})}
    const hashed = await hashedpass(newpassword);
    await usermodel.findByIdAndUpdate(user._id, { password: hashed });
    console.log(user);
    res.status(200).send({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
    });
  }
};

export const updateuser = async (req, res, next) => {
  try {
    const { name, email, address, phone, answer, age, password } = req.body;

    if (!name) res.send({ mess: "please enter the name" });
    // if(!email)res.send({mess:"please enter the email"});

    if (!phone) res.send({ mess: "please enter the phone" });
    if (!address) res.send({ mess: "please enter the address" });
    if (!age) res.send({ mess: "please enter the age" });
    if (!answer) res.send({ mess: "please enter the answer" });
    const user = await usermodel.findOne({ email });

    const hashed = await hashedpass(password);
    await usermodel.findByIdAndUpdate(user._id, {
      name,
      email: user.email,
      address,
      phone,
      answer,
      age,
      password: hashed,
    });
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ _id: user._id }, secret, { expiresIn: "7d" });
    res.status(200).send({
      success: true,
      message: "user updated",
      user: {
        name: name,
        email: email,
        password: hashed,
        role: user.role,
        phone: phone,
        address: address,
        age: age,
        answer: answer,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getuserorders = async (req, res) => {
  try {
    console.log(req.params.id, "idddddd");
    const orders = await Ordermodel.find({ buyer: req.params.id })
      .populate("buyer", "name")
      .populate("products", "-photo");

    // res.json(orders);
    res.status(200).send({
      orders,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error, success: false, mess: "error in getting orders" });
  }
};
export const getadminorders = async (req, res) => {
  try {
    const orders = await Ordermodel.find()
      .populate("buyer", "name")
      .populate("products", "-photo")
      .sort({ createdAt: -1 });

    // res.json(orders);
    res.status(200).send({
      orders,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error, success: false, mess: "error in getting orders" });
  }
};
export const updateorderstatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log(status, "statusssss");
    console.log(id, "iddddddd");
    const order = await Ordermodel.findByIdAndUpdate(id, { status });
    await order.save();
    res.json(order);
  } catch (error) {
    console.log(error);
  }
};
