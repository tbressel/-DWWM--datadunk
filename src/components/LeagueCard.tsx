////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////

// Style importations
import styled from 'styled-components';
import { colors } from '../colors';

// React importations
import React, { useState, useEffect } from 'react';

// Types importation
import { LeagueDataType } from '../interfaces/types';


////////////////////////////////////////////////////////////
//////////////////   STYLE COMPONENTS   ////////////////////
////////////////////////////////////////////////////////////

 const MainContainer = styled.div`
         display: flex;
         flex-direction: column;
         align-items: center;
         height: fit-content;
         border-radius: 10px;
         background-color: ${colors.violet1};
         box-shadow: #d0d0d0 5px 5px 5px;
         transition: 200ms ease-in-out;
         opacity: 0.9;
         @media screen and (min-width: 768px) {       
             cursor: pointer;
             &:hover {
                 transition: 200ms ease-in-out;
                 opacity: 1;
             }}
 `
const LeagueCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
   
    max-width: 450px;
    border-radius: 10px;
    background-color: ${colors.violet1};
    padding: 5px 20px 5px 20px;
    box-shadow: #d0d0d0 5px 5px 5px;
    transition: 200ms ease-in-out;
    opacity: 1;
    @media screen and (min-width: 768px) {
        cursor: pointer;
        opacity: 0.7;
        &:hover {
            transition: 200ms ease-in-out;
            opacity: 1;
        }}
`
const MatchTeam = styled.div`
    display: flex;
    width: 120px;
    flex-direction: column;
    p {
        font-family: 'Barlow Medium'; 
            text-transform: uppercase;
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: normal; 
    }

    .match__team--name p {
       text-align: center;
       width: 100%;
    }

    .match__logo img {
        width: 120px;
        height: 45px;
    }
`


////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////

const LeagueCard: React.FC<{ league: LeagueDataType; onSelectLeague: (id: number) => void }> = (props) => {


    // declaration of the props variables
    const  { id, league_logo, league_name } = props.league;

    console.log(props.league.id);


    const onSelectLeague = () => {
        props.onSelectLeague(id);
      };
    

    return (
        <>
 <MainContainer>


            <LeagueCardContainer onClick={onSelectLeague} id={`${id}`}>
             
                    <MatchTeam>
                        <div className="match__team--name">
                            <p>                            
                                {`${league_name}`}
                                </p>
                        </div>
                        <div className={`match__logo ${league_logo}`}>
                        <img src={`assets/images/leagues/${league_logo}`} alt="" />
                        </div>
                    </MatchTeam>
                   

            

   
            </LeagueCardContainer>
 </MainContainer>





        </>
    )



}



export default LeagueCard;
