////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////

// Style importations
import styled from 'styled-components';
import { colors } from '../colors';

// React importations
import { useEffect, useState } from 'react';

// Components importations
import UserCards from "./UserCards";
import UserAddForm from './UserAddForm';

import { API_BASE_URL } from '../config';

////////////////////////////////////////////////////////////
//////////////////   STYLE COMPONENTS   ////////////////////
////////////////////////////////////////////////////////////

const UsersListContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around; 
    background-color: ${colors.blanc};
    border-radius: 10px;
`;
const AddButtonContainer = styled.div`
cursor: pointer;
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;

border-radius: 15px;
background-color: ${colors.corail};
box-shadow: #d0d0d0 5px 5px 5px;
width: 100%;
height: 75px;
margin: 10px 0;
position: fixed;
  bottom: 0;

img {
    width: 48px;
    height: 48px;
    margin: 10px;
}


&:hover {
    opacity: 0.8;
    transition: 200ms ease-in-out;
}

`;

////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////

const UsersList = () => {


    // declaration of the state variables
    const [users, setUsers] = useState([]);
    const [showAddUserForm, setShowAddUserForm] = useState(false);


    /**
     * Function to handle the click on the cancel button
     */
    const onCancelButtonClicked = () => {
        setShowAddUserForm(false);
    }


    /**
     * Function to handle the click on the add button
     */
    const onAddButtonClick = () => {
        setShowAddUserForm(true);
    }


    /**
     * Function to fetch the data from the API on list route endpoint to obtain the list of users
     */
    const getUsersList = async () => {
        try {

            // Fetching data from the API
            const response = await fetch(`${API_BASE_URL}/api/users/list`);

            // Parsing the JSON data
            const jsonResponse = await response.json();

            // Updating the state variable with the fetched data
            setUsers(jsonResponse);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    /**
     * Using the useEffect hook to fetch the data from the API when the component is mounted
     * useEffect is called to run once. Without useEffect it would be an endless call.    
     */
    useEffect(() => {
        getUsersList();
        // Fetching data from the API
    }, []);


    return (
        <>
            {
                // If showAddUserForm is true, display the UserAddForm component
                showAddUserForm ? <UserAddForm
                    showAddUserForm={showAddUserForm}
                    onCancelButtonClicked={onCancelButtonClicked}
                /> : null
            }

            {
                // Loop on the users state variable to display the UserCards component
            }
            <UsersListContainer>
                {users.map((user, index) => (
                    <UserCards key={index} user={user} />
                ))}
            </UsersListContainer>


            {
                // Listen to the click on the add button
            }
            <AddButtonContainer onClick={onAddButtonClick}>
                <img src="assets/images/icons/icon-add.svg" alt="" />
            </AddButtonContainer>
        </>
    );
};

export default UsersList;