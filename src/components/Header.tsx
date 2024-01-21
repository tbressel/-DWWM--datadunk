import styled from 'styled-components';
import { colors } from '../colors';
import Login from '../components/Login';

import { LoginContext } from '../contexts/LoginContext';
import { useContext } from 'react';



const HeaderContainer = styled.header`
    display: flex;
    padding: 0px 20px;
    justify-content: flex-end;
    border-radius: 20px;
    background: ${colors.blanc};
    margin-bottom: 30px;
`;

const Header = () => {

const { user } = useContext(LoginContext);

    return (
        <>
            <HeaderContainer>
                <Login user={user} />
            </HeaderContainer>
        </>
    )
}


export default Header;