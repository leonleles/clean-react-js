import { ApiContext } from '@/presentation/contexts'
import React, { useContext } from 'react'
import { RouteProps, Navigate, Route } from 'react-router-dom'

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { getCurrentAccount } = useContext(ApiContext)

  return getCurrentAccount()?.accessToken ? <Route {...props}/> : <Navigate to="/login"/>
}

export default PrivateRoute
