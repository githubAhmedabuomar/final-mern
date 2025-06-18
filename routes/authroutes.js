import bodyParser from "body-parser";
import { isuser, isadmin } from "../middlewares/authmiddlewares.js";
import {
  registercontroller,
  logincontroller,
  forgotpasswordcontroller,
  updateuser,
  getuserorders,
  getadminorders,
  updateorderstatus,
} from "../controllers/authcontrolers.js";
import express from "express";
const router = express.Router();
router.post(
  "/register",
  bodyParser.urlencoded({ extended: true }),
  registercontroller
);
router.post(
  "/login",
  bodyParser.urlencoded({ extended: true }),
  logincontroller
);
router.get("/userAuth", isuser, (req, res, next) => {
  res.status(200).send({ ok: true });
});

router.get("/adminAuth", isuser, isadmin, (req, res, next) => {
  res.status(200).send({ ok: true });
});
router.post(
  "/forgotpassword",
  bodyParser.urlencoded({ extended: true }),
  forgotpasswordcontroller
);
router.post(
  "/updateuser",
  bodyParser.urlencoded({ extended: true }),
  updateuser
);
router.get("/getorders/:id", isuser, getuserorders);
router.get("/getadminorders", isuser, getadminorders);
router.post(
  "/updateorderstatus/:id",
  bodyParser.urlencoded({ extended: true }),
  isuser,
  isadmin,
  updateorderstatus
);

export default router;
