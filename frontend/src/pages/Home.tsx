import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";


function Home() {
  const[isLoginPage, setIsLoginPage] = useState<boolean>(true);

  return (
    isLoginPage ? <Login setIsLoginPage={setIsLoginPage}/> : <Register />
  );
}

export default Home;
