import React from 'react'
import { RouteProps, Navigate } from 'react-router-dom'

const PrivateRoute: React.FC<RouteProps> = () => {
  return <Navigate to="/login"/>
}

export default PrivateRoute
