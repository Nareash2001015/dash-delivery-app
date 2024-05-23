/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../provider/AuthProvider';

function Dashboard() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  // const token = authContext.token;
  const isAuthenticated = authContext.isAuthenticated;
  useEffect(() => {
    if(isAuthenticated){
      navigate("/dashboard")
    }
  })
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard