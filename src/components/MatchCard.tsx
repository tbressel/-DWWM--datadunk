////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////

// Style importations
import styled from 'styled-components';
import { colors } from '../colors';

// React importations
import React, { useState, useEffect } from 'react';

// Types importation
import { MatchDataType } from '../interfaces/types';

  
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
 ;`
const MatchCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* min-width: 450px; */
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
;`
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
        width: 100%;
    }

    .loose {
        filter: grayscale();
        opacity: 0.5;
    }
    .win {
        filter: none;
    }
;`
const MatchBoxUp = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
;`
const MatchBoxDown = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
        .match__gameday--text {
            color: ${colors.gris1};           
            text-align: center;
            text-transform: uppercase;
            font-family: Barlow;
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;

            span {
                font-family: 'Barlow Bold';
                font-size: 18px;
                letter-spacing: 0.1rem;
            }
        }
;`  
const MatchScore = styled.div` 
    text-align: center;
        .match__score--text {
            font-family: Barlow Bold;
            font-size: 40px;
            font-style: normal;
            font-weight: 700;
            line-height: normal; 
        }
        .match__league img{
            width: 100px;
            padding: 20px;
        }
;`

////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////

const MatchCard: React.FC<{ match: MatchDataType; onSelectMatch: (id: number) => void }> = (props) => {


    // declaration of the props variables
    const  { id_games, league_logo, home_franchise_id, home_franchise_name, home_franchise_logo, home_score, visitor_franchise_id, visitor_franchise_name, visitor_franchise_logo, visitor_score, game_day, game_date } = props.match;
    

    // declaration of the state variables
    const [teamHomeClass, setTeamHomeClass] = useState('');
    const [teamVisitorClass, setTeamVisitorClass] = useState('');
    

    useEffect(() => {
        if (home_score > visitor_score) {
            setTeamHomeClass('win');
            setTeamVisitorClass('loose');
        } else {
            setTeamHomeClass('loose');
            setTeamVisitorClass('win');
        }
    }, [home_score, visitor_score]);




    const onSelectMatch = () => {
        props.onSelectMatch(id_games);
      };
    

    return (
        <>
        <MainContainer>
            <MatchCardContainer onClick={onSelectMatch} id={`${id_games}`}>
                <MatchBoxUp>
                    <MatchTeam>
                        <div className="match__team--name">
                            <p>                            
                                {`${home_franchise_name}`}
                                </p>
                        </div>
                        <div className={`match__logo ${teamHomeClass}`}>
                        <img src={`assets/images/teamsh/${home_franchise_logo}`} alt="" />
                        </div>
                    </MatchTeam>
                    <MatchScore>
                        <div className="match__league">
                            <img src={`assets/images/leagues/${league_logo}`} alt="" />
                        </div>
                        <p>
                            <span className="match__score--text">{`${home_score}`}</span>
                            <span className="match__score--text"> - </span>
                            <span className="match__score--text">{`${visitor_score}`}</span>
                        </p>
                    </MatchScore>

                    <MatchTeam>
                        <div className="match__team--name">
                            <p>
                            {`${visitor_franchise_name}`}
                            </p>
                        </div>
                        <div className={`match__logo ${teamVisitorClass}`}>
                            <img src={`assets/images/teamsh/${visitor_franchise_logo}`} alt="" />
                        </div>
                    </MatchTeam>
                </MatchBoxUp>

                <MatchBoxDown>
                    <div className="match__gameday--text">
                        <span>{`${game_day}`}</span>
                        <span> - </span>
                        <span>{`${game_date}`}</span>
                    </div>
                </MatchBoxDown>
            </MatchCardContainer>
        </MainContainer>



        </>
    )



}



export default MatchCard;
