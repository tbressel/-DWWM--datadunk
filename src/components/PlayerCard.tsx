import styled from 'styled-components';
import { colors } from '../colors';

import { PlayerDataType } from '../interfaces/types';


///////////////////////  Styled Components ///////////////////////
const Name = styled.div`
font-family: 'Barlow Medium'; 
text-transform: uppercase;
text-align: left; 
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: normal;
width: 100%;
transition: 200ms ease-in-out;


p:nth-child(1) {
    margin-left: 20px;
  
    font-size: 16px;
font-style: normal;
font-weight: 400;}

p:nth-child(2) {
    margin-left: 20px;
  
    font-size: 18px;
font-style: normal;
font-weight: 600;}






`;
const BackLogo = styled.div<{ bglogo: string }>`
width: 70px;
height: 70px;

background-image: url(${props => props.bglogo});
background-repeat: no-repeat;
background-position: center;
background-size: 100%;
transition: 200ms ease-in-out;
`;

const BackPhoto = styled.div<{ bgphoto: string }>`
width: 254px;
height: 287px;

background-image: url(${props => props.bgphoto});
background-repeat: no-repeat;
background-position: center;
transition: 200ms ease-in-out;
`;


const PlayerCardContainer = styled.div`
cursor: pointer;
display: flex;
flex-direction: column;
align-items: center;
border-radius: 15px;
background-color: ${colors.violet1};
padding: 0px 0px 16px 0px; 
max-width: 287px;
min-width: 287px;
max-height: 350px;
min-height: 350px;
box-shadow: #d0d0d0 5px 5px 5px;
opacity: 0.7;
transition: 200ms ease-in-out;
overflow-y: hidden;

    &:hover {
        opacity: 1;
        transition: 200ms ease-in-out;

        ${Name} {            
            font-size: 1.05rem;
            transition: 200ms ease-in-out;
        }
        ${BackLogo} {
            background-size: 90%;
            transition: 200ms ease-in-out;
        }
    }
    
.player__container--top {
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
width: 100%
}
`;
 

const TeamImage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;  
    `;
    const PlayerImage = styled.div`
        position: relative;
        top: 2px;
        left: 6px;

    `;





const PlayerCard: React.FC<{ player: PlayerDataType }> = (props) => {
    const { player_firstname, id_player, player_photo, player_name, player_height, player_weight, franchise_logo } = props.player;


    return (
        <>
            <PlayerCardContainer id={`${id_player}`}>
                <div className='player__container--top'>
                    <TeamImage>
                        <BackLogo bglogo={`assets/images/teamsh/${franchise_logo}`}></BackLogo>
                    </TeamImage>
                    <Name>
                        <p>{`${player_firstname}`}</p>
                        <p> {`${player_name}`}</p>
                    </Name>
                </div>
                <PlayerImage>
                <BackPhoto bgphoto={`assets/images/players-2023-2024/${player_photo}`}></BackPhoto>
                </PlayerImage>
            </PlayerCardContainer>
        </>
    )
}

export default PlayerCard;