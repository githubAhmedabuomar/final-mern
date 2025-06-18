
import { useAuth } from '../../context/authcontext.js'

import Layout from '../../components/layout/Layout.js';
import Usermenue from './usermenue.js';
const Userdashboard = () => {
  const[auth,setauth]=useAuth();
  console.log(auth)
  return (
    <>
    <Layout>
          <h1 style={{textAlign:"center",marginTop:"30px",marginBottom:"50px"}}>{auth?.user?.name||"user"} dashboard </h1>
    <div className='row'>
      <div  className='col col-md-3 ps-5'>
   <Usermenue/>
   


      </div>
      <div style={{}} className='col col-md-9 '>
         <div className='cart shadow py-5'>
      <h2 className='ms-5'>Name: <span style={{color:"teal"}}>{auth?.user.name}</span> </h2>
      
      <h2 className='ms-5'>Email: <span style={{color:"teal"}}>{auth?.user.email}</span> </h2>
    </div>
      </div>
   
    </div>
    </Layout>

    <div style={{minHeight:"63.6vh"}}>
   
    </div>
   

    </>
  )
}

export default Userdashboard;
