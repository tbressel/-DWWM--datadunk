import styled from 'styled-components';
import { colors } from '../colors';

import data from '../datas/lang/fr.json';

import { NavbarDataType } from '../interfaces/types';
import Navigation from './Navigation';
import { useState } from 'react';


///////////////////////  Styled Components ///////////////////////



const BurgerLine = styled.div`
    width: 100%;
    height: 4px;
    margin-top: 6px;
    margin-bottom: 6px;
    background-color: #ffffff;
`;
const Img = styled.img`
    width: 35px;
    height: 37px;
`;

const NavbarWrapper = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        background-color: ${colors.bleu};
        max-height: 77px;
        padding: 13px 20px 13px 20px;
        
        @media screen and (min-width: 768px) {
            align-items: center;
            padding-top: 0px;
            padding-bottom: 0px;
        }
`;

const BurgerContainer = styled.div`
    
    cursor: pointer;
    width: 30px;

    @media screen and (min-width: 768px) {
        display: none;
    }
`;

///////////////////////  RCC  ///////////////////////



const Navbar = () => {
    const [burgerClicked, setBurgerClicked] = useState(false);
    const navbarData: NavbarDataType = data.navbar;
    // console.log(navbarData.logo.icon);
    return (
        <>
            <NavbarWrapper>
                <Img src={`assets/images/icons/${navbarData.logo.icon}`} alt="" />
                <BurgerContainer onClick={() => setBurgerClicked(!burgerClicked)}>
                    <BurgerLine></BurgerLine>
                    <BurgerLine></BurgerLine>
                    <BurgerLine></BurgerLine>
                </BurgerContainer>
                <Navigation burgerClicked={burgerClicked} />
            </NavbarWrapper>
        </>
    );
};
export default Navbar;