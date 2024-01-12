import styled from 'styled-components';
import { colors } from '../colors';

import { MatchDataType } from '../interfaces/types';

import React, { useState, useEffect } from 'react';





///////////////////////  Styled Components ///////////////////////
    const MatchCardContainer = styled.div`
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 450px;
        max-width: 450px;
        border-radius: 10px;
        background-color: ${colors.violet1};
        padding: 5px 20px 5px 20px;
        box-shadow: #d0d0d0 5px 5px 5px;
        transition: 200ms ease-in-out;
        opacity: 0.7;
            
            &:hover {
                transition: 200ms ease-in-out;
                opacity: 1;
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
const MatchCard: React.FC< {match: MatchDataType} > = (props) => {
    const  { id_games, league_name, league_logo, id_franchises, franchise_names, franchise_logos, teamHomeScores, teamVisitorScores, game_days, game_dates } = props.match;
    
    const [teamHomeClass, setTeamHomeClass] = useState('');
    const [teamVisitorClass, setTeamVisitorClass] = useState('');
    
    useEffect(() => {
        if (teamHomeScores > teamVisitorScores) {
            setTeamHomeClass('win');
            setTeamVisitorClass('loose');
        } else {
            setTeamHomeClass('loose');
            setTeamVisitorClass('win');
        }
    }, [teamHomeScores, teamVisitorScores]);
    return (
        <>
            <MatchCardContainer>
                <MatchBoxUp>
                    <MatchTeam>
                        <div className="match__team--name">
                            <p>                            {`${franchise_names.split(',')[0]}`}</p>
                        </div>
                        <div className={`match__logo ${teamHomeClass}`}>
                        <img src={`assets/images/teamsh/${franchise_logos.split(',')[0]}`} alt="" />
                        </div>
                    </MatchTeam>
                    <MatchScore>
                        <div className="match__league">
                            <img src={`assets/images/leagues/${league_logo}`} alt="" />
                        </div>
                        <p>
                            <span className="match__score--text">{`${teamHomeScores}`}</span>
                            <span className="match__score--text"> - </span>
                            <span className="match__score--text">{`${teamVisitorScores}`}</span>
                        </p>
                    </MatchScore>

                    <MatchTeam>
                        <div className="match__team--name">
                            <p>
                            {`${franchise_names.split(',')[1]}`}
                            </p>
                        </div>
                        <div className={`match__logo ${teamVisitorClass}`}>
                            <img src={`assets/images/teamsh/${franchise_logos.split(',')[1]}`} alt="" />
                        </div>
                    </MatchTeam>
                </MatchBoxUp>

                <MatchBoxDown>
                    <div className="match__gameday--text">
                        <span>{`${game_days}`}</span>
                        <span> - </span>
                        <span>{`${game_dates}`}</span>
                    </div>
                </MatchBoxDown>
            </MatchCardContainer>



        </>
    )



}



export default MatchCard;
