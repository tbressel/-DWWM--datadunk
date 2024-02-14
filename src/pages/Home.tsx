import { useContext, useState, useEffect } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { API_BASE_URL } from "../config";

const Home = () => {
  
  
  
  const { user } = useContext(LoginContext);
  
 

  if (!user?.token || user?.status !== 2) {
      return (
          <>
              <h1>Vous n'avez pas les authorisations nécessaires pour accéder à cette page.</h1>
          </>
      )
  }

 
  return (
    <>






    </>
  );
};

export default Home;
