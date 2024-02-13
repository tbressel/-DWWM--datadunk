////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////

import styled from 'styled-components';

import { colors } from '../../colors';

import { useState } from 'react';


////////////////////////////////////////////////////////////
//////////////////   STYLE COMPONENTS   ////////////////////
////////////////////////////////////////////////////////////
const SwitchContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;

`;
const SwitchText = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px 5px;
`;
const ButtonContainer = styled.div`
    display: flex;
    height: 28px;
    padding: 2px;
    border-radius: 9px;
    background: ${colors.violet2};
`;
const ButtonLeft = styled.div`
    display: flex;
    padding: 3px 10px;
    border-radius: 7px;
    transition: 300ms ease-in-out;


    &.active {
        border: 0.5px solid rgba(0, 0, 0, 0.04);
        background: ${colors.violet1};
        box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.04), 0px 3px 8px 0px rgba(0, 0, 0, 0.12);
        font-family: 'Barlow Bold';
        transition: 300ms ease-in-out;
    }

p {
    display: flex;
    width: 40px;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 13px;
}
`;
const ButtonRight = styled.div`
    display: flex;
    padding: 3px 10px;
    border-radius: 7px;
    font-family: 'Barlow Regular';
    transition: 300ms ease-in-out;


    &.active {
        border: 0.5px solid rgba(0, 0, 0, 0.04);
        background: ${colors.violet1};
        box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.04), 0px 3px 8px 0px rgba(0, 0, 0, 0.12);
        font-family: 'Barlow Bold';
        transition: 300ms ease-in-out;

    }

p {
    display: flex;
    width: 47px;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 13px;


}
`;
const FilterButton = styled.button` 
text-align: center;
  border-radius: 50%;
  width: 83px;
  height: 83px;
  margin-left: auto;
  margin-right: auto;


@media screen and (min-width: 768px) {

        }
`;



////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////
const SwitchFilter = ({ showForm, setShowForm, switchText}: any) => {

// console.log('2eme switchText', switchText);

    const handleToggleForm = () => {
        setShowForm(!showForm);
        setToggleButton(!toggleButton);
    };
    
    const [toggleButton, setToggleButton] = useState(false);

    return (
        
        <SwitchContainer onClick={handleToggleForm}>
            <SwitchText>
                <p>{switchText[0].switchName}</p>
            </SwitchText>
            <ButtonContainer>
                <ButtonLeft className={toggleButton ? 'active' : ''}>
                <p>{switchText[1].leftButtonText}</p>
                </ButtonLeft>
                <ButtonRight className={toggleButton ? '' : 'active'}>
                <p>{switchText[2].rightButtonText}</p>
                </ButtonRight>
            </ButtonContainer>
        </SwitchContainer>
    );
}

export default SwitchFilter;

