import React from 'react'
import {mainPagePath} from './path';
import { Navigate } from 'react-router-dom';
import {lsProps} from "../utils/cookies";
import {getLSItem} from "../utils/functions/localStorage";

const PrivateRoute = ({element,noAuth,isAdmin}) => {
   const token = getLSItem(lsProps.token)
   const user = getLSItem(lsProps.user,true)
   const isAuthenticated = !token || !user || isAdmin && user.role !== 'admin'
   const statement = noAuth ? !isAuthenticated : isAuthenticated
   return (
       statement ? <Navigate to={mainPagePath} replace={true} /> : element
   )
}

export default PrivateRoute