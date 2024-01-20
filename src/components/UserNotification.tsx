
import styled from 'styled-components';
import { colors } from '../colors';


const NotificationContainer = styled.div`
position: absolute;
top: calc(100vh / 2 - (189px / 2));
left: calc(100vw / 2 - (544px / 2));

display: flex;
flex-direction: column;
justify-content: center;

width: 544px;
height: 189px;

border-radius: 20px;
background: ${colors.blanc};
box-shadow: #d0d0d0 5px 5px 5px;
z-index: 3;
`;

const NotificationTitle = styled.div`
color: #000;
text-align: center;

font-family: Barlow;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: normal;
`;

const UserNotification = () => {
    return (
        <>
            <NotificationContainer>
                <NotificationTitle>
                    <p>    Connexion à votre compte réussie</p>
                </NotificationTitle>
            </NotificationContainer>
        </>
    )
}

export default UserNotification;