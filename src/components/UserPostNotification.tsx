////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////

// Style importation
import styled from 'styled-components';
import { colors } from '../colors';

// React importations
import { useContext } from 'react';

// COntext importations
import { LoginContext } from '../contexts/LoginContext';
import { NotificationContext } from '../contexts/NotificationContext';


////////////////////////////////////////////////////////////
//////////////////   STYLE COMPONENTS   ////////////////////
////////////////////////////////////////////////////////////

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

        p {
            color: ${colors.bleu};
            font-family: 'Barlow Medium';

            font-style: normal;
            font-weight: 600;
            line-height: 4rem;
            letter-spacing: -0.13px;
        }      
`;
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
const UserDeleteButtonContainer = styled.div`
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
 
////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////

const UserPostNotification = ({ action }: { action: string }) => {

    // declaration of the global context variables
    const { user } = useContext(LoginContext);
    const { msg } = useContext(NotificationContext);
    
   return (
        <>
         <Mask>
            <NotificationContainer>
                <NotificationTitle>
                    {(action === 'delete' || action === "add") ? <p>{msg?.message}</p> : <p>{user?.message}</p>}
                </NotificationTitle>
            </NotificationContainer>
         </Mask>
        </>
    )
}

export default UserPostNotification;