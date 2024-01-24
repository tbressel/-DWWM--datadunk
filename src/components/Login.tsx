////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////

// Style importations
import styled from 'styled-components';
import { colors } from '../colors';

// React importations
import { useContext, useState } from 'react';

// Components importations
import LoginForm from './LoginForm';
import UserNotification from './UserNotification';

// Context importation
import { LoginContext } from '../contexts/LoginContext';

// Types importation
import { UserDataType } from '../interfaces/types';

////////////////////////////////////////////////////////////
//////////////////   STYLE COMPONENTS   ////////////////////
////////////////////////////////////////////////////////////

const LoginBoxLeft = styled.div`
    display: flex;
    width: 128px;
    height: 85px;
    justify-content: center;
    align-items: center;

    img {
        width: 70px;
        height: 70px;
        border-radius: 56px;
        border: 4px solid ${colors.corail};   
    }
`;
const LoginBoxRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
`;
const LoginContainer = styled.div`
    /* margin-top: 150px; */
    display: flex;
    flex-direction: row;
    gap: 10px;
`;
const LoginName = styled.div`
    display: flex;
    height: 24px;
    flex-direction: column;
    justify-content: center;
    align-self: stretch;

    color: ${colors.bleu};
    font-family: 'Gibson Medium';
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    
    span:nth-child(1) {
        text-transform: capitalize;
    }
    span:nth-child(2) {
        text-transform: uppercase;
    }
`;
const LoginAction = styled.div`
display: flex;
  padding: 3px;
  align-items: center;
  gap: 10px;
  font-family: 'Gibson Light';
  font-weight: 100;

&::before {
    content: url(assets/images/icons/icon-logout.svg);
}

&:hover {
    cursor: pointer;
    color: ${colors.corail};
    transition: 200ms ease-in-out;
}   
`;

/////////////////////////////////////////////////////////////
//////////////////   INTERFACE TYPES   //////////////////////
/////////////////////////////////////////////////////////////
interface LoginProps {
    user: UserDataType | null;
}

////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////

const Login = ({ user }: LoginProps) => {
    
    
    // declaration of the state variables
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [isNotification, setNotification] = useState({state :false, action: ''});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    
    // declaration of the context variables
    const { setUser } = useContext(LoginContext);


    const logoutSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users/logout?action=logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },          
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la requête POST');
            }

            // Traitez la réponse ici si nécessaire
            const jsonResponse = await response.json();
            setUser(jsonResponse);
           

        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire:', error);
        }
        // Ajoutez ici la logique pour envoyer vos données (fetch, axios, etc.)

    }

    const onLogout = () => {

      
      // on envoie une requete au serveur pour supprimer la session
      logoutSubmit();
         
     // On passe le statut de connexion à true
     setNotification({ state: true, action: 'logout' });

     // Masquer UserNotification après 2 secondes
      setTimeout(() => {
          setNotification({ state: false, action: '' });
      }, 2000);
            // on modifie le context pour supprimer l'utilisateur
            setUser(null);
  }

    const onCrossClick = () => {
        setShowLoginForm(false);
    }



    const onLogin = () => {
        // On masque le formulaire de login
        setShowLoginForm(false);
        
        // On passe le statut de connexion à true
        setNotification({ state: true, action: 'login' });

        // On modifie la variable d'état isLoggedIn pour afficher le bouton de déconnexion
        setIsLoggedIn(true);
        
        // Masquer UserNotification après 2 secondes
        setTimeout(() => {
            setNotification({ state: false, action: '' });
        }, 2000);
      }


    return (
        <>
            {showLoginForm ? 
                <LoginForm 
                // passage de props  de la valeur de l'état de showLoginForm
                showLoginForm={showLoginForm}
              
                // passage de props de la valeur de létat de setShowLoginForm quand on clique sur la croix
                 onCrossClick={onCrossClick}
                
                // passage de props de la valeur de létat de isLoggedIn quand on clique sur le bouton de validation
                onLogin={onLogin}
     
                />
            : null}

            {(!showLoginForm && isNotification.state) ? <UserNotification action={isNotification.action} /> : null}

            <LoginContainer>
                <LoginBoxLeft>
                    {(user && isLoggedIn) ? (
                           <img src={`assets/images/avatars/${user.avatar}`} alt={`${user.firstname} ${user.lastname}`} />
                    ) : null}
                </LoginBoxLeft>
                <LoginBoxRight>
                    <LoginName>
                        {user ? (
                            <p>
                            <span>{user.firstname} </span>
                            <span>{user.lastname}</span>
                        </p>
                            ) : null}
                    </LoginName>
                    <LoginAction onClick={ () => {setShowLoginForm(!showLoginForm)
                    if (isLoggedIn) {

                        // On modifie la variable d'état isLoggedIn pour afficher le bouton de déconnexion
                        setIsLoggedIn(false);
                        // On modifie le context pour supprimer l'utilisateur
                        setUser(null);
                        // On masque le formulaire de login
                        onCrossClick();
                    }}}>
                                                
                            {isLoggedIn ? (
                                <p onClick={() => onLogout()}>Déconnexion</p>
                            ) : (
                                <p>Connexion</p>
                            )}
                                                  
                    </LoginAction>
                </LoginBoxRight>
            </LoginContainer>
        </>
    )
}


export default Login;

