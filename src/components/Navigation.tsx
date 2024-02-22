////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////

// Style importations
import styled from 'styled-components';
import { colors } from '../colors';

// React importations
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';

// Context importation
import { LoginContext } from '../contexts/LoginContext';

// Types importation
import { NavigationDataType } from '../interfaces/types';
// import { NavbarDataType } from '../interfaces/types';

// Datas importation
import data from '../datas/lang/fr.json';

////////////////////////////////////////////////////////////
//////////////////   STYLE COMPONENTS   ////////////////////
////////////////////////////////////////////////////////////

const Img = styled.img`
    height: 1.3rem;

@media screen and (min-width: 768px) {
    display: none;
}`

const Logo = styled.img`
    height: 3rem;

@media screen and (min-width: 768px) {
    display: none;
}`


const H1 = styled.h1`
    font-family: 'Gibson Bold';
    color: ${colors.corail};
 
@media screen and (min-width: 768px) {
    display: none;
}`


const Menu = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    height: 450px;
    
@media screen and (min-width: 768px) {
    flex-direction: row;
    gap: 5px;
    height: fit-content;
}`


const Li = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px;
    transition: 200ms ease-in-out;
    border-radius: 20px;

@media screen and (min-width: 768px) {
    padding: 20px;
    &:hover {
            background-color: ${colors.corail};
            transition: 200ms ease-in-out;
    }
}`


const MenuItem = styled.span`
    font-family: 'Gibson Medium';
    color: ${colors.blanc};
`

/////////////////////////////////////////////////////////////
//////////////////   INTERFACE TYPES   //////////////////////
/////////////////////////////////////////////////////////////

interface NavigationProps {
    burgerClicked: boolean;
    onCloseMenu: () => void;
};


interface NavbarDataType {
    [key: string]: {
        icon: string;
        name: string;
        path: string;
    };
}
////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////
const Navigation = (props: NavigationProps) => {


    // declaration of the state variables
    const navigationData: NavigationDataType = data.navigation;
    const navbarData: NavbarDataType = data.navbar;


    // Props passage into this syled component 
    const Nav = styled.nav`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 20px;

        position: absolute;
        z-index: 2;
        top: 60px;
        right: ${props.burgerClicked ? '0px' : '-750px'};
        width: 90vw;
        padding: 0 20px 8px 20px;
        background-color: ${colors.bleu};

        @media screen and (min-width: 768px) {
            position: initial;
            width: 100%;
            padding: 0;
        }
    `;


    // declaration of the global context variables
    const { user } = useContext(LoginContext);


    return (
        <>
            <Nav>
                <Logo src={`assets/images/icons/${navbarData.logo.icon}`} alt="" />
                <H1>DATADUNK</H1>
                <Menu>
                    {Object.keys(navigationData).map(key => (
                        <NavLink key={key} to={navigationData[key].path} onClick={props.onCloseMenu}>
                            <Li>
                                <Img className={key} src={`assets/images/icons/${navigationData[key].icon}`} alt={navigationData[key].name} />
                                <MenuItem className='menu-item'>{navigationData[key].name}</MenuItem>
                            </Li>
                        </NavLink>
                    ))}
                    {
                        (user?.status === 2) ?
                            (
                                <Li onClick={props.onCloseMenu}>
                                    <Img src={`assets/images/icons/icon-admin.svg`} alt="admin" />
                                    <NavLink to="admin">
                                        <MenuItem className='menu-item'>ADMIN</MenuItem>
                                    </NavLink>
                                </Li>
                            ) : null
                    }
                </Menu>
            </ Nav>
        </>
    );
};
export default Navigation;



