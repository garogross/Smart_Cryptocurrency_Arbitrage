import React from 'react'
import {adminLoginPagePath, loginPagePath, mainPagePath} from './path';
import { Navigate } from 'react-router-dom';
import Cookies from "js-cookie";

const PrivateRoute = ({element,noAuth}) => {
   const token = Cookies.get('token')
   const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null
   const isAuthenticated = !token || !user
   const statement = noAuth ? !isAuthenticated : isAuthenticated

   return (
       statement ? <Navigate to={mainPagePath} replace={true} /> : element
   )
}

export default PrivateRoute