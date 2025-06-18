
import { useAuth } from '../../context/authcontext.js'

import Layout from "../../components/layout/Layout.js"
import AdminMenue from './AdminMenue.js';
const Userdashboard = () => {
  const[auth]=useAuth();
  console.log(auth)
  return (
    <>
<Layout>
  <div className='container-fluid'>
      <div className='row'>
      <div className='col col-md-3'>
    <AdminMenue/>

  </div>
  <div className='col col-md-9 container-fluid my-5'>
  <div className='w-75 card border shadow p-5'>
    <h2><span style={{color:"teal"}}>Name:</span>{auth?.user?.name}</h2>
    <h2><span style={{color:"teal"}}>Email:</span>{auth?.user?.email}</h2>
  </div>
  </div>
  </div> 
  </div>


</Layout>
    </>
  )
}

export default Userdashboard;