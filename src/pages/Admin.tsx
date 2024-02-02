import UsersList from "../components/UsersList";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";



const Admin = () => {
    
    const { user } = useContext(LoginContext);

    
    if (user?.status !== 2 ) {
        return (
            <>
            <h1>Vous n'avez pas les authorisation nécessaire pour acceder à cette page.</h1>
            </>
        )
    } 
   

return (
<>


<UsersList/>

</>
)


}


export default Admin;