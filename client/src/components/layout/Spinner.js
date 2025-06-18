import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Spinner = () => {
    const[count,setcount]=useState(5);
    const navigate=useNavigate()
    useEffect(()=>{
        const countInterval=setInterval(()=>{
            setcount((pv)=>--pv);
            
        },1000);
        count === 0 && navigate("/");
        return ()=>clearInterval(countInterval);
},[count])
  return (
    <>
    <div style={{height:"100vh"}}   className='d-flex justify-content-center align-items-center w-100'>
    <div className='d-flex justify-content-center align-items-center w-100'>
         <h1>redirecting you in {count} seconds</h1> 
     <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
     </div>
    </div>
    </div>
   
    
    </>
  )
}

export default Spinner;
