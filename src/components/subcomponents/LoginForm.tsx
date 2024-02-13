////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////

// Style importations
import styled from 'styled-components';
import { colors } from '../../colors';

// React importations
import React, {useState, useEffect, useContext} from 'react';

// Context importation
import { LoginContext } from '../../contexts/LoginContext';

// Config importation
import { API_BASE_URL } from '../../config';

////////////////////////////////////////////////////////////
//////////////////   STYLE COMPONENTS   ////////////////////
////////////////////////////////////////////////////////////

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
    min-width: 90%;
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
            border: 0;
            border-radius: 10px;
            background: ${colors.violet1};
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

/////////////////////////////////////////////////////////////
//////////////////   INTERFACE TYPES   //////////////////////
/////////////////////////////////////////////////////////////
interface LoginFormProps {
    showLoginForm: boolean;
    onCrossClick: () => void;
    onLogin: () => void;
}

////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////
const LoginForm = (props: LoginFormProps) => {


    // Get the user from the context
    const { user, setUser } = useContext(LoginContext);


    // Get datas from the form
    const [formData, setFormData] = useState({});


    /**
     * 
     * Handle the form submission including the CSRF token
     * 
     * @param event 
     */
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        try {
            const response = await fetch(`${API_BASE_URL}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('POST request error');
            } else {
                const jsonResponse = await response.json();

                // update the user context with the response
                setUser(jsonResponse);

                props.onLogin();
            }

        } catch (error) {
            console.error('Error during the form send', error);
        }
    };




    /**
     * 
     * Update the form data when the user types in the form
     * @param event 
     */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
        // console.log('Form data updated:', formData);
    };





    /**
     * Close the form when clicking the cross
     */
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