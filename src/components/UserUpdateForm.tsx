////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////

// Style importations
import styled from 'styled-components';
import { colors } from '../colors';

// React importations
import React, { useState, useEffect, useContext } from 'react';

// Components importations
import UserPostNotification from './UserPostNotification';

// Context importation
import { NotificationContext } from "../contexts/NotificationContext";

// Types importation
import { UsersListDataType } from '../interfaces/types';

import { API_BASE_URL } from '../config';

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
const UserUpdateFormContainer = styled.form`

display: flex;
padding: 25px 0px;
flex-direction: column;
border-radius: 20px;
background: ${colors.blanc};
position: relative;
top: 368px;
width: 90%;

@media screen and (min-width: 768px) {
    top: 172px;
}

`;
const UserUpdateFormTitle = styled.div`
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
const UserUpdateFormInputContainer = styled.div`   
    display: flex;
    padding: 15px 38px;
    flex-direction: column;  
    align-items: center;
    gap: 20px;
    
    @media screen and (min-width: 768px) {
        gap: 50px;
}
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
const UserUpdateFormCheckboxContainer = styled.div`   
    display: flex;
    padding: 15px 38px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;

        .checkbox__container {        
            display: flex;
            width: 100%;
            height: 42px;
            justify-content: space-between;
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
                @media screen and (min-width: 768px) {
                    width: 150px;
                    
        }
    }
        @media screen and (min-width: 768px) {
        gap: 50px;
}
`;
const UserUpdateFormPasswordContainer = styled.div`
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
const UserUpdateFormButtonContainer = styled.div`
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

interface UserUpdateFormProps {
    onCancelButtonClicked: () => void;
    showUpdateUserForm: boolean;
    selectedUser: UsersListDataType | null;
}

////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////

const UserUpdateForm = (props: UserUpdateFormProps) => {


    // declaration of the state variables
        const [formData, setFormData] = useState<Partial<UsersListDataType>>({});
        const [isNotification, setNotification] = useState({state :false, action: ''});
        const [showUpdateUserForm, setShowUpdateUserForm] = useState(props.showUpdateUserForm);
        const [eye1, setEye1] = useState(false)
        const [eye2, setEye2] = useState(false)


    // declaration of the global context variables
    const { setMsg } = useContext(NotificationContext);


    
      // Effet pour mettre à jour l'état local formData lorsque l'utilisateur sélectionné change
  useEffect(() => {
    if (props.selectedUser) {
      setFormData({
        // Initialiser les champs du formulaire avec les données de l'utilisateur sélectionné
        id: props.selectedUser.id,
        user_lastname: props.selectedUser.user_lastname || '',
        user_firstname: props.selectedUser.user_firstname || '',
        user_pseudo: props.selectedUser.user_pseudo || '',
        user_email: props.selectedUser.user_email || '',
        user_role: props.selectedUser.user_role || undefined,
      });
    }
  }, [props.selectedUser]);



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
            const response = await fetch(`${ API_BASE_URL }/api/users/update`, {

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
            onUpdateUser();

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

        const { name, value } = event.target;
        const newValue = value === '' ? event.target.placeholder : value;

          setFormData({
            ...formData,
            [name]: newValue,
        });
    };



    
    /**
     * Function to show/hide notification and the window add form
     */
    const onUpdateUser = () => {
      // Hide the add form
      setShowUpdateUserForm(false);
        
      // Display Notification with the 'add' action
      setNotification({ state: true, action: 'update' });

      //  Hide Notification window after delay
      setTimeout(() => {
           setNotification({ state: false, action: '' });
       }, 2000);

      }



    /**
     * Function to show/hide password
     */
    const handleEye1Change = () => {

        setEye1(!eye1);
    }



    /**
     * Function to show/hide password
     */
    const handleEye2Change = () => {

        setEye2(!eye2);
    }

    return (
        <>

{isNotification.state ? <UserPostNotification action={isNotification.action}/> : null}
        {props.showUpdateUserForm ?
            <Mask>
                <UserUpdateFormContainer onSubmit={formSubmit} className="login__form" id="login-form" method="post">                    
                    <UserUpdateFormTitle>
                        <p>Modifier un utilisateur</p>
                    </UserUpdateFormTitle>
                    <UserUpdateFormInputContainer >
                        <InputField>
                            <label htmlFor="lastnameField"><p>Nom </p>
                                <input onChange={handleInputChange} id="lastnameField" name="new_lastname" type="text"   placeholder={formData.user_lastname} autoComplete="lastname" />
                            </label>
                        </InputField>
                        <InputField>
                            <label htmlFor="firstnameField"><p>Prénom </p>
                                <input onChange={handleInputChange} id="firstnameField" name="new_firstname" type="text"  placeholder={formData.user_firstname}  autoComplete="firstname" />
                            </label>
                        </InputField>
                        <InputField>
                            <label htmlFor="nicknameField"><p>Pseudo </p>
                                <input onChange={handleInputChange} id="nicknameField" name="new_nickname" type="text"  placeholder={formData.user_pseudo} autoComplete="nickname" />
                            </label>
                        </InputField>
                        <InputField>
                            <label htmlFor="emailField"><p>Email </p>
                                <input onChange={handleInputChange} id="emailField" name="new_email" type="text"  placeholder={formData.user_email} autoComplete="email" />
                            </label>
                        </InputField>
                    </UserUpdateFormInputContainer>
                    <UserUpdateFormCheckboxContainer>
                        <div className="checkbox__container" >
                            <label htmlFor="radio1">Coatch</label>
                            <input  onChange={handleInputChange} type="radio" id="radio1" name="new_role" value="1" required/>
                        </div>
                        <div className="checkbox__container" >
                            <label htmlFor="radio2">Utilisateur</label>
                            <input  onChange={handleInputChange} type="radio" id="radio2" name="new_role" value="2" required/>
                        </div>
                        <div className="checkbox__container" >
                            <label htmlFor="radio3">Invité</label>
                            <input  onChange={handleInputChange} type="radio" id="radio3" name="new_role" value="3" required/>
                        </div>
                        <div className="checkbox__container" >
                            <label htmlFor="radio4">Autre</label>
                            <input  onChange={handleInputChange} type="radio" id="radio4" name="new_role" value="4" required/>
                        </div>
                    </UserUpdateFormCheckboxContainer>
                    <UserUpdateFormPasswordContainer>
                        <InputField>
                            <label htmlFor="passwordField"><p>Mot de passe </p>
                                <input onChange={handleInputChange} id="passwordField" name="new_password" type={eye1 ? "text" : "password"} placeholder="Saisissez votre mot de passe ici ..."  autoComplete="password"  required/>
                            </label>
                        </InputField>
                        <div className="button__eye" onClick={handleEye1Change}>
                            
                            {eye1 ? <img src="./assets/images/icons/icon-eye-open.png" alt="" /> : <img src="./assets/images/icons/icon-eye-close.svg" alt="" />}
                           
                        </div>
                    </UserUpdateFormPasswordContainer>

           



                    <UserUpdateFormPasswordContainer>
                        <InputField>
                            <label htmlFor="passwordCheckField"><p>Resaisissez votre mot de passe </p>
                                <input onChange={handleInputChange} id="passwordCheckField" name="new_passwordcheck" type={eye2 ? "text" : "password"} placeholder="Resaisissez votre mot de passe ici ..."  autoComplete="passwordcheck"  required/>
                            </label>
                        </InputField>
                        <div className="button__eye" onClick={handleEye2Change}>
                        {eye2 ? <img src="./assets/images/icons/icon-eye-open.png" alt="" /> : <img src="./assets/images/icons/icon-eye-close.svg" alt="" />}
                        </div>
                    </UserUpdateFormPasswordContainer>
                    <UserUpdateFormButtonContainer>
                        <UserAddEmptyButton onClick={() => props.onCancelButtonClicked()}>Annuler</UserAddEmptyButton>
                        <UserAddPlainButton type="submit">Valider</UserAddPlainButton>
                    </UserUpdateFormButtonContainer>
                </UserUpdateFormContainer>
            </Mask>
 : null}


        </>
    );
}

export default UserUpdateForm;