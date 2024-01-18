import styled from 'styled-components';
import { colors } from '../colors';

import React, { useState, useEffect } from 'react';

const Mask = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    
    width: 100vw;
    height: 100vh;
    background: rgba(17, 15, 26, 0.60);
    z-index: 1000;
`;

const LoginFormContainer = styled.div`
min-width: 40%;

border-radius: 20px;
background: var(--Blanc, #FFF);
`;

const LoginFormSubContainer = styled.div`
display: flex;
  flex-direction: column;
  margin: 40px 70px;


h2 {
    color: var(--Violet-5, #110F1A);
    text-align: center;
    font-family: 'Barlow Medium';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.16px;
}
`;

const LoginField = styled.div`

font-family: 'Barlow Medium';
 width: 100%;
input {
    margin-top: 10px;
    width: 100%;
    height: 48px;
    border-radius: 10px;
    border: 0;
    background: var(--Violet-1, #F3F2F8);
}
`;



const LoginFormField = styled.form`
display: flex;
flex-direction: column;

align-items: center;
gap: 32px;  




`;





const LoginFormButton = styled.div`

padding: 10px 24px;
border-radius: 5px;
  background: var(--Orange, #E1533D);
  width: fit-content;


.btn__color-green {
    color: white;
    background-color: transparent;
  border: 0;
}


`;

const Cross = styled.div`

img {
    width: 20px;
    height: 20px;
  cursor: pointer;
  float: right;

}


`;


interface LoginFormProps {
    showLoginForm: boolean;
    onHideLoginForm: () => void;
}

const LoginForm = (props: LoginFormProps) => {

    const handleCrossClick = () => {
        // Au lieu de setHideLoginForm(true), utilise onHideLoginForm
        props.onHideLoginForm();
    };



    return (
        <>
        {props.showLoginForm && (


            <Mask>
                <LoginFormContainer>


                    <LoginFormSubContainer>
                    <Cross  onClick={handleCrossClick}>
                    <img src="assets/images/icons/icon-cross.svg" alt="" />
                    </Cross>

                        <h2>Authentification</h2>


                        <LoginFormField className="login__form" id="login-form" method="post">


                            <LoginField>
                                <label htmlFor="pseudoField"><p>Pseudo </p>
                                    <input id="pseudoField" name="pseudo" type="text" placeholder="Saisissez votre pseudo ici ..." required autoComplete="username" />
                                </label>
                            </LoginField>


                            <LoginField className="password-container">
                                <label htmlFor="passwordField"><p>Mot de passe </p>
                                    <input id="passwordField" name="password" type="password" placeholder="Saisissez votre mot de passe ici ..." required autoComplete="current-password" />
                                </label>

                        </LoginField>


                    <LoginFormButton>
                        <button className="btn btn__color-green" type="submit">Valider</button>

                    </LoginFormButton>
                    </LoginFormField>




                </LoginFormSubContainer>


            </LoginFormContainer>
        </Mask >
        )}
        </>


    )
};

export default LoginForm;