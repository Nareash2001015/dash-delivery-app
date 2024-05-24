/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../provider/AuthProvider';
import NavBar from '../components/NavBar';
import CustomerContent from '../components/CustomerContent';
import AdminContent from '../components/AdminContent';

function Dashboard() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const token = authContext.token;
  const isAuthenticated = authContext.isAuthenticated;
  useEffect(() => {
    if(!isAuthenticated){
      navigate("/home")
    }
  })
  return (
    <div className='bg-gray-100 h-screen'>
      <NavBar />
      {user.role == "customer" ? (
        <CustomerContent />
      ) : (
        <AdminContent />
      )}
    </div>
  )
}

export default Dashboard