
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";


const Articles = () => {

    const { user } = useContext(LoginContext);
    const authToken = localStorage.getItem('authToken');

    console.log(authToken)
    console.log(user?.token)

    if ((!user?.token || user?.status !== 2) && (authToken === user?.token)) {
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
export default Articles;
