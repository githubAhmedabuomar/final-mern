import React from 'react'
import Layout from '../components/layout/Layout'
import { NavLink } from 'react-router-dom'

const Pagenotfound = () => {
  return (
    <>
      <Layout title="Mern E-commerce PageNotFound-page" >
    <div className='pnfd'>
      <h1>ERROR 404</h1>
      <p>PAGE NOT FOUND</p>
      <><NavLink className='btn btn-primary' to={"/"}>go back</NavLink></>
    </div>
      </Layout>
    </>
  )
}

export default Pagenotfound
