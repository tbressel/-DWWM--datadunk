import styled from 'styled-components';
import { colors } from '../colors';

import { NavLink } from 'react-router-dom';

import data from '../datas/lang/fr.json';

import { NavigationDataType } from '../interfaces/types';
import { NavbarDataType } from '../interfaces/types';

const Li = styled.li`
display: flex;
flex-direction: row;
align-items: center;
gap: 10px;
padding: 20px;
margin: 4px;
border-radius: 20px;

&:hover {
    background-color: ${colors.corail};
}
@media screen and (min-width: 768px) {
    padding: 20px;
}
`;

const MenuItem = styled.span`
font-family: 'Gibson Medium';
color: ${colors.blanc};
`;

const Img = styled.img`
height: 1.3rem;
@media screen and (min-width: 768px) {
    display: none;
}
`;

const Logo = styled.img`
height: 5rem;
padding-right: 5px;

@media screen and (min-width: 768px) {
    display: none;
}
`;

const H1 = styled.h1`
font-family: 'Gibson Bold';
color: ${colors.corail};
font-size: 1.3rem;
@media screen and (min-width: 768px) {
    display: none;
}
`;

const Menu = styled.ul`
display: flex;
flex-direction: column;
justify-content: space-around;
width: 100%;

@media screen and (min-width: 768px) {
    flex-direction: row;
    gap: 5px;
}

`;

interface NavigationProps {
    burgerClicked: boolean;
}

const Navigation = (props: NavigationProps) => {
    const navigationData: NavigationDataType = data.navigation;
    const navbarData: NavbarDataType = data.navbar;


    
    const Nav = styled.nav`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 20px;

        position: absolute;
        z-index: 2;
        top: 60px;
        right: ${props.burgerClicked ? '0px' : '-350px'};
        width: 276px;
        padding: 30px 20px 8px 20px;
        background-color: ${colors.bleu};

        @media screen and (min-width: 768px) {
            width: 100%;
            position: initial;
            padding: 0;
        }
    `;



    // console.log(Object.keys(navigationData));
    // console.log(Object.keys(navigationData).map(key => navigationData[key].path));
    // console.log(Object.keys(navigationData).map(key => navigationData[key].name));
    // console.log(Object.keys(navigationData).map(key => navigationData[key].icon));

    return (
        <>
            <Nav>
                <Logo src={`assets/images/icons/${navbarData.logo.icon}`} alt="" />
                <H1>DATADUNK</H1>
                <Menu>
                    {Object.keys(navigationData).map(key => (
                        <Li key={key}>
                            <Img className={key} src={`assets/images/icons/${navigationData[key].icon}`} alt="" />
                            <NavLink to={navigationData[key].path}>
                                <MenuItem className='menu-item'>{navigationData[key].name}</MenuItem>
                            </NavLink>
                        </Li>
                    ))}
                </Menu>
            </ Nav>
        </>
    );
};
export default Navigation;



