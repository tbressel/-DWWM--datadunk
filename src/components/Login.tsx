import styled from 'styled-components';
import { colors } from '../colors';

import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm'; 





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






const Login = () => {

    const [showLoginForm, setShowLoginForm] = useState(false);

    const handleLoginClick = () => {
        // Inverser l'état actuel
        setShowLoginForm(!showLoginForm);
    };


    return (
        <>
{showLoginForm && <LoginForm showLoginForm={showLoginForm} onHideLoginForm={() => setShowLoginForm(false)} />}

            <LoginContainer>
                <LoginBoxLeft>
                    <img src="assets/images/avatars/avatar-SambaDiaw.png" alt="" />
                </LoginBoxLeft>
                <LoginBoxRight>
                    <LoginName>
                        <p>
                            <span>Samba</span>
                            <span>DIAW</span>
                        </p>
                    </LoginName>
                    <LoginAction onClick={handleLoginClick}>
                        <p>
                            Déconnexion
                        </p>
                    </LoginAction>
                </LoginBoxRight>
            </LoginContainer>
        </>
    )
}


export default Login;

