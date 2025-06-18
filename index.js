import express from "express";
import dotenv from "dotenv";
import connectDb from "./db.js";
import authroutes from "./routes/authroutes.js";
import bodyParser from "body-parser";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productroutes from "./routes/productroute.js";



const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();
connectDb();
app.use(cors());

app.use("/api/v1/auth", authroutes);

app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productroutes);
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const port = process.env.PORT || 8080;
console.log(port);
app.listen(port, (err) => {
  console.log("server connected");
});
