import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import LoadingPage from "./components/LoadingPage/LoadingPage";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <Outlet />
        </>
      )}
    </div>
  );
}

export default App;
