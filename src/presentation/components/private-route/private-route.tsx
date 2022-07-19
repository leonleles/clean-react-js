import { ApiContext } from '@/presentation/contexts'
import React, { ReactElement, useContext } from 'react'
import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
  element?: ReactElement
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Element }) => {
  const { getCurrentAccount } = useContext(ApiContext)

  return getCurrentAccount()?.accessToken ? Element : <Navigate to="/login"/>
}

export default PrivateRoute
