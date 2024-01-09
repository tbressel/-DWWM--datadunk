import styled from 'styled-components';
import { colors } from '../colors';

// import data from '../datas/teams/proa.json';
import { useState, useEffect } from 'react'; // Importer useState et useEffect depuis React

import { TeamDataType } from '../interfaces/types';


///////////////////////  Styled Components ///////////////////////

const TeamCard = () => {
    // const teamData: TeamDataType = data;
    const [teamData, setTeamData] = useState<TeamDataType | null>(null); // Ajouter un état pour stocker les données

    useEffect(() => {
        // Lire les données du localStorage lorsque le composant est monté
        const teamData = localStorage.getItem('dataTeams'); // Remplacez 'teamData' par la clé que vous avez utilisée pour stocker les données
        if (teamData) {
            setTeamData(JSON.parse(teamData));
        }
    }, []);



    const ClubName = styled.div`
        font-family: 'Barlow Regular'; 
        text-transform: uppercase;
        text-align: center; 
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal; 
        transition: 200ms ease-in-out;
    `;
    const BackImg = styled.div<{ bgurl: string }>`
        width: 140px;
        height: 77.778px;
        flex-shrink: 0; 
        background-image: url(${props => props.bgurl});
        background-repeat: no-repeat;
        background-position: center;
        background-size: 60%;
        transition: 200ms ease-in-out;
    `;
    const TeamCardContainer = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 15px;
        background-color: ${colors.violet1};
        padding: 5px 0px 16px 0px; 
        max-width: 150px;
        max-height: 172px;
        opacity: 0.5;
        transition: 200ms ease-in-out;

        &:hover {
            opacity: 1;
            transition: 200ms ease-in-out;
            
            ${ClubName} {
                font-size: 18px;
                transition: 200ms ease-in-out;
            }
            ${BackImg} {
                background-size: 70%;
                transition: 200ms ease-in-out;
            }
        }
    `;
    const TeamImage = styled.div`
        display: flex;
        width: 150px;
        height: 113px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;  
    `;

return (
    <>
        {teamData && Object.keys(teamData).map((teamKey) => (
            <TeamCardContainer key={teamKey}>
                <TeamImage>
                    <BackImg bgurl={`assets/images/teamsh/${teamData[teamKey].team_picture}`}></BackImg>
                </TeamImage>
                <ClubName>
                    <p>{teamData[teamKey].team_clubname}</p>
                </ClubName>
            </TeamCardContainer>
        ))}
    </>
)
}

export default TeamCard;