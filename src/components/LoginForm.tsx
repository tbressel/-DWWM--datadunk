import styled from 'styled-components';
import { colors } from '../colors';

import { UserContext } from '../contexts/UserContext';

import React, {useState, useContext, useEffect} from 'react';


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
    background: ${colors.blanc};
`;

const LoginFormSubContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 40px 70px;


h2 {
    color:  ${colors.bleu};
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
            background:  ${colors.blanc};
        }
`;

const LoginFormField = styled.form`
display: flex;
flex-direction: column;
align-items: center;
gap: 32px;  
`;

const LoginFormButton = styled.button`
cursor: pointer;
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
    onCrossClick: () => void;
    onLogin: () => void;
}


const LoginForm = (props: LoginFormProps) => {
    const { user, setUser } = useContext(UserContext);
    const [formData, setFormData] = useState({});


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log('Form data submitted:', formData);

        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la requête POST');
            }

            // Traitez la réponse ici si nécessaire
            const jsonResponse = await response.json();
            setUser(jsonResponse);
            // console.log('Réponse JSON:', jsonResponse); 
            // console.log('le tyle de ma data : ',typeof user);

            props.onLogin();

        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire:', error);
        }
        // Ajoutez ici la logique pour envoyer vos données (fetch, axios, etc.)
    };



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        // console.log('Form data updated:', formData);
    };


    const handleCrossClick = () => {
        props.onCrossClick();
    };

    return (
        <>
            {props.showLoginForm ?
                <Mask>
                    <LoginFormContainer>
                        <LoginFormSubContainer>
                            <Cross onClick={handleCrossClick}>
                                <img src="assets/images/icons/icon-cross.svg" alt="" />
                            </Cross>
                            <h2>Authentification</h2>
                            <LoginFormField onSubmit={handleSubmit} className="login__form" id="login-form" method="post">
                                <LoginField>
                                    <label htmlFor="pseudoField"><p>Pseudo </p>
                                        <input onChange={handleInputChange} id="pseudoField" name="pseudo" type="text" placeholder="Saisissez votre pseudo ici ..." required autoComplete="username" />
                                    </label>
                                </LoginField>
                                <LoginField className="password-container">
                                    <label htmlFor="passwordField"><p>Mot de passe </p>
                                        <input onChange={handleInputChange} id="passwordField" name="password" type="password" placeholder="Saisissez votre mot de passe ici ..." required autoComplete="current-password" />
                                    </label>
                                </LoginField>
                                <LoginFormButton type="submit">Valider</LoginFormButton>

                            </LoginFormField>
                        </LoginFormSubContainer>
                    </LoginFormContainer>
                </Mask>
                : null}
        </>
    );
};

export default LoginForm;