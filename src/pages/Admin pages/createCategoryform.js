import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/authcontext.js";

const CreateCategoryform = ({ categories }) => {
  const [auth] = useAuth();
  const inputref = useRef();
  const [categoryname, setcategoryname] = useState([]);

  const createcategory = async () => {
    try {
      const res = await axios.post(
        "/api/v1/category/createCategory",
        { categoryname },
        {
          headers: { Authorization: auth?.token },
        }
      );

      if (res && res.data.success) toast.success("category aded succesfully");
    } catch (error) {
      console.log(error, "error");
      toast.error(error);
    }
  };
  const handlesubmite = () => {
    // e.preventDefault();
    createcategory();
    setcategoryname("");
  };
  useEffect(() => {
    inputref.current.focus();
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          handlesubmite(e);
        }}
        class="input-group mb-3"
      >
        <input
          ref={inputref}
          type="text"
          value={categoryname}
          onChange={(e) => {
            setcategoryname(e.target.value);
          }}
          className="form-control me-5 text-center"
          placeholder="Enter category name"
          aria-label="Recipient’s username"
          aria-describedby="button-addon2"
        />

        <button
          type="submit"
          class="btn btn-outline-primary"
          id="button-addon2"
        >
          Add Category
        </button>
      </form>
    </>
  );
};

export default CreateCategoryform;
