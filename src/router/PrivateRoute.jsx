import React from 'react'
import {adminLoginPagePath, loginPagePath} from './path';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({element,navigateTo,role,reversedStatement}) => {
   const token = localStorage.getItem('token')
   const user = JSON.parse(localStorage.getItem('user'))
   const statement = reversedStatement ? token || user : !token || !user || role && user.role !== role

   const navigate = !token || !user ? navigateTo || adminLoginPagePath : -1
   return (
       statement ? <Navigate to={navigate} replace={true} /> : element
   )
}

export default PrivateRoute