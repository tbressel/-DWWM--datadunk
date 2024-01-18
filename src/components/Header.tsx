import styled from 'styled-components';
import { colors } from '../colors';
import Login from '../components/Login';
import React, { useState, useEffect } from 'react';


const HeaderContainer = styled.header`
    display: flex;
    width: 100%;
    padding: 0px 20px;
    align-items: flex-start;
    gap: 522px;
    border: 1px solid black;
`;



const Header = () => {

    return (
        <>
            <HeaderContainer>
                <Login />
            </HeaderContainer>
        </>
    )
}




export default Header;