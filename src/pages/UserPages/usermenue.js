import { NavLink } from "react-router-dom";
const Usermenue = () => {
  return (
    <>
      <div className="text-center mt-5 ms-5">
        <div className="list-group">
          <NavLink
            className="list-group-item list-group-item-action"
            to={"/dashboard/user/userprofile"}
          >
            User profile
          </NavLink>
          <NavLink
            className="list-group-item list-group-item-action"
            to={"/dashboard/user/orders"}
          >
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Usermenue;
