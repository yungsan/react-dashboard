import { Outlet, Navigate } from 'react-router-dom'
import { getAccessToken } from '../lib/untils'

const PrivateRoutes = () => {
  const auth = getAccessToken();
  return (
    auth ? <Outlet /> : <Navigate to="/auth/login" />
  )
}

export default PrivateRoutes