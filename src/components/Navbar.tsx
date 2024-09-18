////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////

// Style importations
import styled from 'styled-components';
import { colors } from '../colors';

// React importations
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

// Components importations
import Navigation from './Navigation';

// Types importation
// import { NavbarDataType } from '../interfaces/types';

// Datas importation
import data from '../datas/lang/fr.json';

////////////////////////////////////////////////////////////
//////////////////   STYLE COMPONENTS   ////////////////////
////////////////////////////////////////////////////////////

const BurgerLine = styled.div`
    width: 100%;
    height: 4px;
    margin-top: 6px;
    margin-bottom: 6px;
    background-color: #ffffff;
`
const Img = styled.img`
    margin-left: 20px;
    width: 35px;
    height: 37px;
`
const NavbarWrapper = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        background-color: ${colors.bleu};
        max-height: 77px;
        padding: 13px 0 13px 0;
        position: fixed;
        width: 100%;
        z-index: 1;
                @media screen and (min-width: 768px) {
            align-items: center;
            padding-top: 0px;
            padding-bottom: 0px;
        }
`

const BurgerContainer = styled.div`
    width: 30px;
    margin-right: 20px;

    @media screen and (min-width: 768px) {
        display: none;
    }
`;


interface  NavbarDataType {
    [key: string]: {
        icon: string;
        name: string;
        path: string;
    };
}
////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////

const Navbar = () => {

    // declaration of the state variables
    const [burgerClicked, setBurgerClicked] = useState(false);

    // declaration of data for languages
    const navbarData: NavbarDataType = data.navbar;
 
    // declaration of the function to close the menu
    const handleCloseMenu = () => {
        setBurgerClicked(false);
      };


    return (
        <>
            <NavbarWrapper>
            <NavLink to="home">
                <Img onClick ={handleCloseMenu} src={`assets/images/icons/${navbarData.logo.icon}`} alt="" />
            </NavLink>
                <BurgerContainer onClick={() => setBurgerClicked(!burgerClicked)}>
                    <BurgerLine></BurgerLine>
                    <BurgerLine></BurgerLine>
                    <BurgerLine></BurgerLine>
                </BurgerContainer>
                <Navigation burgerClicked={burgerClicked} onCloseMenu={handleCloseMenu}/>
            </NavbarWrapper>
        </>
    );
};
export default Navbar;


