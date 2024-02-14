import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";



const Guides = () => {

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
export default Guides;
