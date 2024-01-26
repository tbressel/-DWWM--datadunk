////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////

// Style importations
import styled from "styled-components";
import { colors } from "../colors";

// React importations
import { useState, useContext } from "react";

// Components importations
import UserPostNotification from './UserPostNotification';
import UserPrevNotification from './UserPrevNotification';
import UserUpdateForm from './UserUpdateForm';

// Type importations
import { UsersListDataType } from "../interfaces/types";

// Context importations
import { NotificationContext } from '../contexts/NotificationContext';

import { API_BASE_URL } from '../config';

////////////////////////////////////////////////////////////
//////////////////   STYLE COMPONENTS   ////////////////////
////////////////////////////////////////////////////////////

const UserCardContainer = styled.div`
    background-color: ${colors.blanc};
    padding: 10px;
    border-radius: 10px;
`;
const UserCardUl = styled.ul`  
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    background-color: ${colors.violet1};
    box-shadow: #d0d0d0 5px 5px 5px;
    opacity: 0.7;
    transition: 200ms ease-in-out;
    overflow-y: hidden;

    &:hover {
        opacity: 1;
        transition: 200ms ease-in-out;

    }
`;
const Li = styled.li`
    display: flex;
    flex-direction: column;
    gap: 25px;
    width: 100%;
   
`;
const UserHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 10px;
`;
const UserProfile = styled.div`
    display: flex;
    align-items: center;
    width: 100%;

   
`;
const UserAvatar = styled.div` 
    img {
        width: 48px;
        height: 48px; 
        border-radius: 48px;
        border: 4px solid var(--Orange, #E1533D);
        margin: 0 10px 0 0;
    }
`;
const UserInfos = styled.div` 
width: 100%;
font-family: 'Gibson Medium';
font-style: normal;
p:nth-child(1) {    
        width: 100%;
        color: var(--noir, #000);
        text-align: left;
        text-transform: capitalize;
        font-size: 16px;
        font-weight: 600;
        line-height: normal;
        letter-spacing: -0.16px;
    }

    p:nth-child(2) {
        width: 100%;
        color: var(--noir, #000);
        text-align: left;

        font-size: 13px;
   
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.13px;
    }

`;
const UserActions = styled.div` 
display: flex;

justify-content: space-between;


div {
    display: flex;

img {
    padding: 10px;

}

img:nth-child(1) {
    width: 32px;    
}
img:nth-child(2) {
    width: 24px;    
}


}

`;
const UserExtend = styled.div`
cursor: pointer;
display: flex;
width: 30px;
height: 48px;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 10px;

img  {

    width: 20px;
    height: 10px;
    flex-shrink: 0;
    stroke-width: 2px;
    stroke: var(--noir, #000);
    transform: rotate(180deg);
    transition: 200ms ease-in-out;
}


`;
const UserDrawerUl = styled.ul`
display: flex;
flex-direction: column;
`;
const UserDrawerLi = styled.li`
    font-family: 'Gibson Light';
    display: flex;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    margin: 10px;


span {
  font-family: 'Gibson Medium';
  font-weight: 600;
}

`;


////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////

const UserCards: React.FC<{ user: UsersListDataType }> = (props) => {


  // declaration of the state variables
  const [ShowDrawerOnClick, setShowDrawerOnClick] = useState(false);
  const [showUpdateUserForm, setShowUpdateUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UsersListDataType | null>(null);
  const [isNotification, setNotification] = useState({ state: false, action: '' });
  const [isConfirmation, setConfirmation] = useState({ state: false, message: '' });


  // declaration of user props
  const { id, user_pseudo, user_avatar, user_role_name, user_lastname, user_firstname, user_email } = props.user;


  // declaration of the context variables
  const { setMsg } = useContext(NotificationContext);


  /**
   * function to delete the user with the id passed in parameter
   * 
   * @param id 
   */
  const deleteSubmit = async (id: number) => {
    try {

      // Fetching data with the id of the user to delete
      const response = await fetch('http://localhost:5000/api/users/delete?action=delete&id=' + id, {
        method: 'DELETE',
      });

      // Parsing the JSON data
      const jsonResponse = await response.json();

      // Updating the state variable with the fetched data
      setMsg(jsonResponse);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  /**
   * Function to handle the click on the delete button and manage the notification display
   */
  const onDelete = () => {
    // calling of the deleteSubmit function
    deleteSubmit(id);

    // Display Notification with the 'delete' action
    setNotification({ state: true, action: 'delete' });
    setConfirmation({ state: false, message: '' });

    // Hide Notification window after delay
    setTimeout(() => {
      setNotification({ state: false, action: '' });
    }, 2000);
  }


  /**
   * Function to prevent the click on the delete button and manage the notification display
   */ 
  const isDelete = () => {
    setConfirmation({ state: true, message: 'Etes vous sur de vouloir supprimer ce compte ?' });
  };


  /**
   * Function to when click on the cancel button and hide the confirmation window
   */
  const handleCancel = () => {
    setConfirmation({ state: false, message: '' });
  }


  /**
   * Function to when click on the confirm button and hide the confirmation window
   */
  const handleConfirm = () => {
    onDelete(); // Appeler votre fonction onDelete ici
    setConfirmation({ state: false, message: '' });
  }


  /**
   * Function called onClick and toggle drawer 
   */
  const handlerShowDrawer = () => {
    setShowDrawerOnClick(!ShowDrawerOnClick);
  };



  /**
  * Function to handle the click on the add button
  */
  const onUpdateButtonClick = () => {
    // Get the user to update
    setSelectedUser(props.user);
    // Display the update form
    setShowUpdateUserForm(true);
  }

  return (
    <>

      {
          // If isNotification is true, then display UserPostNotification component
          isNotification.state ? <UserPostNotification
            action={isNotification.action}
          /> : null
      }
      {
          // If isNotification is true, then display UserPostNotification component
          isConfirmation.state ? <UserPrevNotification
            message={isConfirmation.message}
            onCancel={handleCancel}
            onConfirm={handleConfirm}
          /> : null
      }
      
        {
          // If showUpdateUserForm is true, display the UserAddForm component
          showUpdateUserForm ? (
            <UserUpdateForm
              showUpdateUserForm={showUpdateUserForm}
              onCancelButtonClicked={() => {
                // Réinitialiser l'utilisateur sélectionné lors de l'annulation
                setSelectedUser(null);
                setShowUpdateUserForm(false);
              }}
              selectedUser={selectedUser} // Passer l'utilisateur sélectionné au formulaire d'édition
            />
          ) : null
        }
          
      <UserCardContainer>
        <UserCardUl>

          <Li id={`${id}`}>
            <UserHeader>
              <UserProfile>
                <UserAvatar>
                  <img src={`assets/images/avatars/${user_avatar}`} alt={`${user_pseudo}`} />
                </UserAvatar>
                <UserInfos>
                  <p>{`${user_pseudo}`}</p>
                  <p>{`${user_role_name}`}</p>
                </UserInfos>
              </UserProfile>
              <UserActions>
                <div>
                  <img onClick={isDelete} src="assets/images/icons/icon-delete.svg" alt="" />
                  <img onClick={onUpdateButtonClick} src="assets/images/icons/icon-write.svg" alt="" />
                </div>
              </UserActions>
              <UserExtend onClick={handlerShowDrawer}>
                <img src="assets/images/icons/icon-chevron.svg" alt=""
                  style={{ transform: ShowDrawerOnClick ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </UserExtend>
            </UserHeader>

            {ShowDrawerOnClick ? (
              <UserDrawerUl>
                <UserDrawerLi>
                  <p><span>Nom : </span>{`${user_lastname}`}</p>
                </UserDrawerLi>
                <UserDrawerLi>
                  <p><span>Prénom : </span>{`${user_firstname}`}</p>
                </UserDrawerLi>
                <UserDrawerLi>
                  <p><span>Email : </span>{`${user_email}`}</p>
                </UserDrawerLi>
              </UserDrawerUl>
            ) : null}
          </Li>

        </UserCardUl>
      </UserCardContainer>
      
    </>
  );
};

export default UserCards;
