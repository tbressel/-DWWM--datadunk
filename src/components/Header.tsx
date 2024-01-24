////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////

// Style importations
import styled from 'styled-components';
import { colors } from '../colors';

// React importations
import { useContext } from 'react';

// Components importations
import Login from '../components/Login';

// Context importation
import { LoginContext } from '../contexts/LoginContext';

////////////////////////////////////////////////////////////
//////////////////   STYLE COMPONENTS   ////////////////////
////////////////////////////////////////////////////////////

const HeaderContainer = styled.header`
    display: flex;
    padding: 0px 20px;
    justify-content: flex-end;
    border-radius: 20px;
    background: ${colors.blanc};
    margin-bottom: 30px;
`;

////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////
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