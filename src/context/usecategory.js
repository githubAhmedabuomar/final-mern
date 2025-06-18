import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
const Usecategory = () => {
  const [categories, setcategories] = useState([]);

  const getallcategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/getallCategories");
      if (data.success) setcategories(data.categories);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  useEffect(() => {
    getallcategories();
  }, []);
  return categories;
};

export default Usecategory;
