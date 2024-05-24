/* eslint-disable @typescript-eslint/no-unused-vars */
import {  useState } from "react";
import { CircularProgress } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function SplashScreen() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<number>(0);
  setInterval(progressFunc, 1000);
  function progressFunc() {
    setProgress(progress + 25);
  }
  if (progress == 100) {
    navigate("/home");
  }
  return (
    <div className="flex justify-center items-center m-2 h-screen bg-gray-50">
      <div className="m-5">
        <CircularProgress size='100px' value={progress} thickness='4px'>
        </CircularProgress>
      </div>
    </div>
  );
}

export default SplashScreen;
