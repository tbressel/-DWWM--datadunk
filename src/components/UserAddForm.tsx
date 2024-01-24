////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////

// Style importations
import styled from 'styled-components';
import { colors } from '../colors';

// React importations
import React, { useState, useContext } from 'react';

// Components importations
import UserNotification from './UserNotification';

// Context importation
import { NotificationContext } from "../contexts/NotificationContext";


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
const UserAddFormContainer = styled.form`

display: flex;
padding: 25px 0px;
flex-direction: column;
border-radius: 20px;
background: ${colors.blanc};
position: relative;
top: 172px;
width: 90%;

`;
const UserAddFormTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    p {
            color: ${colors.bleu};
            font-family: 'Barlow Medium';
  
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            letter-spacing: -0.13px;
        }
        `;
const UserAddFormInputContainer = styled.div`   
    display: flex;
    padding: 15px 38px;
    flex-direction: column;  
    align-items: center;
    gap: 50px;
    
    `;
const InputField = styled.div`
        font-family: 'Barlow Medium';
        width: 100%;
            input {
                margin-top: 10px;
                width: 100%;
                height: 48px;
                border-radius: 10px;           
                background: ${colors.violet1};
                font-family: 'Barlow Medium';
                font-size: 13px;             
                font-weight: 600;             
                color: ${colors.violet3};
            }
            label {
  width: 226px;
}
    `;
const UserAddFormCheckboxContainer = styled.div`   
    display: flex;
    padding: 15px 38px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 50px;
    flex-wrap: wrap;

        .checkbox__container {        
            display: flex;
            width: 150px;
            height: 42px;
            justify-content: center;
            align-items: center;
            gap: 10px;

                input {
                    display: flex;
                    width: 159px;
                    height: 42px;
                    justify-content: center;
                    align-items: center;
                    gap: 14.292px;
                }
        }
`;
const UserAddFormPasswordContainer = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 15px;
    padding: 30px;

        .button__eye {
            display: flex;
            align-items: flex-end;
            gap: 15px;
            align-self: end;
            width: 40px;
            height: 40px;

            img {
                width: 40px;
            height: 40px;

            }
        }
`;
const UserAddFormButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 74px;
    align-self: stretch; 
`;
const UserAddPlainButton = styled.button`
    cursor: pointer;
    display: inline-flex;
    height: 50px;
    padding: 10px 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 5px;
    background: var(--Orange, #E1533D);

    color: var(--Violet-1, #F3F2F8);

    /* Corps de texte */
    font-family: Barlow;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.13px;

`;
const UserAddEmptyButton = styled.button`
    cursor: pointer;
    display: inline-flex;
    height: 50px;
    padding: 10px 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;

    border-radius: 5px;
    background: var(--blanc, #FFF);
    color: var(--orange, #E1533D);

    /* Corps de texte */
    font-family: Barlow;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.13px;

`;

/////////////////////////////////////////////////////////////
//////////////////   INTERFACE TYPES   //////////////////////
/////////////////////////////////////////////////////////////

interface UserAddFormProps {
    onCancelButtonClicked: () => void;
    showAddUserForm: boolean;
}

////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////

const UserAddForm = (props: UserAddFormProps) => {


    // declaration of the state variables
    const [formData, setFormData] = useState({});
    const [isNotification, setNotification] = useState({state :false, action: ''});
    const [showAddUserForm, setShowAddUserForm] = useState(props.showAddUserForm); // Utilisez l'état local

    
    // declaration of the global context variables
    const { setMsg } = useContext(NotificationContext);


    /**
     * 
     * Function to fetch API route to send data
     * @param event 
     */
    const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // Disable default comportment
        event.preventDefault();

        try {

           // Fetching data from the API route
            const response = await fetch('http://localhost:5000/api/users/add', {

            // sending a POST json document
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la requête POST');
            } else {
        
            // doing some actions if response is ok

            // Parsing the JSON data
            const jsonResponse = await response.json();
            
            // Execute function which automatically hide the add form and send a user Notification
                onAddUser();

            // Update the global context 
                setMsg(jsonResponse);
            }
                
                
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire:', error);
        }

    };



    /**
     * Function to get values from each input form
     * 
     * @param event 
     */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };


    /**
     * Function to show/hide notification and the window add form
     */
    const onAddUser = () => {
      // Hide the add form
      setShowAddUserForm(false);
        
      // Display Notification with the 'add' action
      setNotification({ state: true, action: 'add' });

      //  Hide Notification window after delay
      setTimeout(() => {
           setNotification({ state: false, action: '' });
       }, 2000);

      }


    return (
        <>

{isNotification.state ? <UserNotification action={isNotification.action}/> : null}
        {showAddUserForm ?
            <Mask>
                <UserAddFormContainer onSubmit={formSubmit} className="login__form" id="login-form" method="post">
                    <UserAddFormTitle>
                        <p>Ajouter un utilisateur</p>
                    </UserAddFormTitle>
                    <UserAddFormInputContainer >
                        <InputField>
                            <label htmlFor="lastnameField"><p>Nom </p>
                                <input onChange={handleInputChange} id="lastnameField" name="lastname" type="text" placeholder="Saisissez votre nom ici ..." required autoComplete="lastname" />
                            </label>
                        </InputField>
                        <InputField>
                            <label htmlFor="firstnameField"><p>Prénom </p>
                                <input onChange={handleInputChange} id="firstnameField" name="firstname" type="text" placeholder="Saisissez votre prénom ici ..." required autoComplete="firstname" />
                            </label>
                        </InputField>
                        <InputField>
                            <label htmlFor="nicknameField"><p>Pseudo </p>
                                <input onChange={handleInputChange} id="nicknameField" name="nickname" type="text" placeholder="Saisissez votre pseudo ici ..." required autoComplete="nickname" />
                            </label>
                        </InputField>
                        <InputField>
                            <label htmlFor="emailField"><p>Email </p>
                                <input onChange={handleInputChange} id="emailField" name="email" type="text" placeholder="Saisissez votre email ici ..." required autoComplete="email" />
                            </label>
                        </InputField>
                    </UserAddFormInputContainer>
                    <UserAddFormCheckboxContainer>
                        <div className="checkbox__container" >
                            <label htmlFor="checkbox1">Coatch</label>
                            <input  onChange={handleInputChange} type="radio" id="checkbox1" name="role" value="1"/>
                        </div>
                        <div className="checkbox__container" >
                            <label htmlFor="checkbox2">Utilisateur</label>
                            <input  onChange={handleInputChange} type="radio" id="checkbox2" name="role" value="2"/>
                        </div>
                        <div className="checkbox__container" >
                            <label htmlFor="checkbox3">Invité</label>
                            <input  onChange={handleInputChange} type="radio" id="checkbox3" name="role" value="3"/>
                        </div>
                        <div className="checkbox__container" >
                            <label htmlFor="checkbox4">Autre</label>
                            <input  onChange={handleInputChange} type="radio" id="checkbox4" name="role" value="4"/>
                        </div>
                    </UserAddFormCheckboxContainer>
                    <UserAddFormPasswordContainer>
                        <InputField>
                            <label htmlFor="passwordField"><p>Mot de passe </p>
                                <input onChange={handleInputChange} id="passwordField" name="password" type="text" placeholder="Saisissez votre mot de passe ici ..." required autoComplete="password" />
                            </label>
                        </InputField>
                        <div className="button__eye">
                            <img src="./assets/images/icons/icon-eye-close.svg" alt="" />
                        </div>
                    </UserAddFormPasswordContainer>
                    <UserAddFormPasswordContainer>
                        <InputField>
                            <label htmlFor="passwordCheckField"><p>Resaisissez votre mot de passe </p>
                                <input onChange={handleInputChange} id="passwordCheckField" name="passwordcheck" type="text" placeholder="Resaisissez votre mot de passe ici ..." required autoComplete="passwordcheck" />
                            </label>
                        </InputField>
                        <div className="button__eye">
                            <img src="./assets/images/icons/icon-eye-close.svg" alt="" />
                        </div>
                    </UserAddFormPasswordContainer>
                    <UserAddFormButtonContainer>
                        <UserAddEmptyButton onClick={() => props.onCancelButtonClicked()}>Annuler</UserAddEmptyButton>
                        <UserAddPlainButton type="submit">Valider</UserAddPlainButton>
                    </UserAddFormButtonContainer>
                </UserAddFormContainer>
            </Mask>
 : null}


        </>
    );
}

export default UserAddForm;