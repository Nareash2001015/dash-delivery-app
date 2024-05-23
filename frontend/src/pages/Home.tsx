import { useContext, useEffect, useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";


function Home() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const token = authContext.token;
  useEffect(() => {
    if(token){
      navigate("/dashboard")
    }
  })
  const[isLoginPage, setIsLoginPage] = useState<boolean>(true);

  return (
    isLoginPage ? <Login setIsLoginPage={setIsLoginPage}/> : <Register setIsLoginPage={setIsLoginPage}/>
  );
}

export default Home;
