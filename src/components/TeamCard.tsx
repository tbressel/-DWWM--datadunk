import styled from 'styled-components';
import { colors } from '../colors';

import { TeamDataType } from '../interfaces/types';


///////////////////////  Styled Components ///////////////////////
    const ClubName = styled.div`
        font-family: 'Barlow Medium'; 
        text-transform: uppercase;
        text-align: center; 
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
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
        background-size: 55%;
        transition: 200ms ease-in-out;
    `;
    const TeamCardContainer = styled.div`
    cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 15px;
        background-color: ${colors.violet1};
        padding: 0px 0px 16px 0px; 
        max-width: 170px;
        min-width: 170px;
        max-height: 162px;
        min-height: 162px;
        box-shadow: #d0d0d0 5px 5px 5px;
        opacity: 0.7;
        transition: 200ms ease-in-out;
        overflow-y: hidden;
       

        &:hover {
            opacity: 1;
            transition: 200ms ease-in-out;
            
            ${ClubName} {            
                font-size: 1.05rem;
                transition: 200ms ease-in-out;
            }
            ${BackImg} {
                background-size: 60%;
                transition: 200ms ease-in-out;
            }
        }
    `;
    const TeamImage = styled.div`
        display: flex;
        width: 150px;
        height: 120px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;  
    `;


const TeamCard: React.FC< {team: TeamDataType} > = (props) => {
    const { franchise_name, franchise_logo } = props.team;


return (
    <>

<TeamCardContainer>
    <TeamImage>
        <BackImg bgurl={`assets/images/teamsh/${franchise_logo}`}></BackImg>
    </TeamImage>
    <ClubName>
        <p>{`${franchise_name}`}</p>
    </ClubName>
</TeamCardContainer>
      
    </>
)
}

export default TeamCard;