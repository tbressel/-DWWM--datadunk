////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////

// Style importations
import styled from 'styled-components';
import { colors } from '../colors';

// Types importation
import { PlayerDataType } from '../interfaces/types';


////////////////////////////////////////////////////////////
//////////////////   STYLE COMPONENTS   ////////////////////
////////////////////////////////////////////////////////////

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
    width: 100px;
    height: 100px;
    background-image: url(${props => props.bgphoto});
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
    transition: 200ms ease-in-out;
    border-radius: 50%;
    border: 4px solid ${colors.corail};
    
    @media screen and (min-width: 768px) {
        width: 254px;
        height: 287px;
        border-radius: 0;
        border: 0; 
        background-position: center;
        background-size: none;

}
`;

const PlayerCardContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    border-radius: 15px;
    background-color: ${colors.violet1};
    padding: 20px; 
    width: 100%;
    min-width: 287px;
    max-height: 350px;

    box-shadow: #d0d0d0 5px 5px 5px;
    transition: 200ms ease-in-out;
    overflow-y: hidden;
    opacity: 1;
    
.player__container--top {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    top: -50px;


 @media screen and (min-width: 768px) {
    position: static;

 }



}
    @media screen and (min-width: 768px) {
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
        transition: 200ms ease-in-out;
        overflow-y: hidden;
        opacity: 0.7;

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



////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////

const PlayerCard: React.FC<{ player: PlayerDataType }> = (props) => {

    // declaration of props variables
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
                    <BackPhoto bgphoto={`assets/images/players-2023-2024/${player_photo}.webp`}></BackPhoto>
                </PlayerImage>
            </PlayerCardContainer>
        </>
    )
}

export default PlayerCard;