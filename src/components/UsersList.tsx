import styled from 'styled-components';
import { colors } from '../colors';
import { useEffect, useState } from 'react';
import UserCards from "./UserCards";


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


const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users/list');
                const data = await response.json();
                setUsers(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
     <UsersListContainer>
        {users.map((user, index) => (
            <UserCards key={index} user={user} />
            ))}
  
     </UsersListContainer>

<AddButtonContainer>
<img src="assets/images/icons/icon-add.svg" alt="" />

</AddButtonContainer>

            </>

    );
};
export default UsersList;