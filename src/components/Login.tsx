import styled from 'styled-components';
import { colors } from '../colors';

import { useState} from 'react';
import LoginForm from './LoginForm';
import UserNotification from './UserNotification';


import { User } from '../interfaces/types';


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

interface LoginProps {
    user: User | null;
  }

  const Login: React.FC<LoginProps> = ({ user }) => {
   
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [isNotification, setNotification] = useState(false);


    return (
        <>
            {showLoginForm ? 
                <LoginForm 
                // passage de props  de la valeur de l'état de showLoginForm
                showLoginForm={showLoginForm}
              
                // passage de props de la valeur de létat de setShowLoginForm quand on clique sur la croix
                onCrossClick={() => setShowLoginForm(false)}
                
                // passage de props de la valeur de létat de isLoggedIn quand on clique sur le bouton de validation
                onLogin={() => {
                        // On masque le formulaire de login
                        setShowLoginForm(false);

                        // On passe le statut de connexion à true
                        setNotification(true);

                        // Masquer UserNotification après 2 secondes
                        setTimeout(() => {
                            setNotification(false);
                        }, 1500);
                    }}
    
                />
            : null}

            {(!showLoginForm && isNotification) ? <UserNotification /> : null}

            <LoginContainer>
                <LoginBoxLeft>
                    {user ? (
                <img src="" alt={`${user.firstname} ${user.lastname}`} />
                // <img src={`${user.avatar}`} alt={`${user.firstName} ${user.lastName}`} />
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
                    <LoginAction onClick={ () => setShowLoginForm(!showLoginForm)}>
                        <p>
                            Connexion
                        </p>
                    </LoginAction>
                </LoginBoxRight>
            </LoginContainer>
        </>
    )
}


export default Login;

