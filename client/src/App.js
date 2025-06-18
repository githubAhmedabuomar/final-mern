import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import Pagenotfound from "./pages/Pagenotfound";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login.js";
import Home from "./pages/Home.js";
import PrivateRoute from "./routes/PrivateRoute.js";
import Userdashboard from "./pages/UserPages/UserDashboard.js";
import ForgotPassword from "./pages/forgotPassword.js";
import UserProfile from "./pages/UserPages/UserProfile.js";
import UserOrders from "./pages/UserPages/UserOrders.js";
import AdmineRoute from "./pages/Admin pages/AdmineRoute.js";
import Admindashboard from "./pages/Admin pages/Admindashboard.js";
import Admincategories from "./pages/Admin pages/Admincategories.js";
import Createproduct from "./pages/Admin pages/Createproduct.js";
import Users from "./pages/Admin pages/Users.js";
import Categories from "./pages/Categories.js";
import Products from "./pages/Admin pages/Products.js";
import Singleproduct from "./pages/Admin pages/Singleproduct.js";
import Updateproduct from "./pages/Admin pages/Updateproduct.js";
import Searchresults from "./pages/Searchresults.js";
import Categoryproducts from "./pages/Categoryproducts.js";
import Cart from "./pages/UserPages/Cart.js";
import Adminorders from "./pages/Admin pages/Adminorders.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singleproduct/:slug" element={<Singleproduct />} />
        <Route path="/searchresults" element={<Searchresults />} />
        <Route path="/categoryproducts/:slug" element={<Categoryproducts />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Userdashboard />} />
          <Route path="user/userprofile" element={<UserProfile />} />
          <Route path="user/orders" element={<UserOrders />} />
        </Route>
        <Route path="/dashboard" element={<AdmineRoute />}>
          <Route path="admin" element={<Admindashboard />} />
          <Route path="admin/categories" element={<Admincategories />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/createproduct" element={<Createproduct />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/updateproduct/:slug" element={<Updateproduct />} />
          <Route path="admin/orders" element={<Adminorders />} />
        </Route>
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
