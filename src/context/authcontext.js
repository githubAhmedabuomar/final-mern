


import { createContext, useContext, useEffect, useState } from "react";
 const AuthContext=createContext();
const AuthProvider = ({children}) => {
   
const[Auth,setAuth]=useState({user:null,token:""});

      useEffect(()=>{
         const data=localStorage.getItem("auth");
         if(data){
            const parsedata=JSON.parse(data);
            setAuth({...Auth,user:parsedata.user,token:parsedata.token});
         }
      },[Auth?.token])
  return (
    <>
    <AuthContext.Provider value={[Auth,setAuth]}>
        {children}
    </AuthContext.Provider> 
    </>
  )
}

const useAuth=()=>useContext(AuthContext);

export {useAuth,AuthProvider};
