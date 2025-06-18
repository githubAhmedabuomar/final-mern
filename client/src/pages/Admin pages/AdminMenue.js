import { NavLink } from "react-router-dom";


const AdminMenue = () => {
  return (
<div className="text-center mt-5 ms-5">
<div  className="list-group">
< NavLink className="list-group-item list-group-item-action" to="/dashboard/admin/categories">Categories</ NavLink>
< NavLink className="list-group-item list-group-item-action" to="/dashboard/admin/createproduct">Create product</ NavLink>
< NavLink className="list-group-item list-group-item-action" to="/dashboard/admin/productS">Products</ NavLink>
< NavLink className="list-group-item list-group-item-action" to="/dashboard/admin/users">Users</ NavLink>
< NavLink className="list-group-item list-group-item-action" to="/dashboard/admin/orders">Orders</ NavLink>
</div>
</div>)



  
}

export default AdminMenue;
