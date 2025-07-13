import React from 'react'
import { Navigate } from 'react-router-dom'
export default function ProtectRoute(props) {
  if (localStorage.getItem('usertoken') !==null) {
    // If user token exists, render the children components
    return props.children
  }
  else{
    // If user token does not exist, redirect to the login page
    return <Navigate to="/login" />
  }
}
