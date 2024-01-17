import styled from 'styled-components';
import { colors } from '../colors';

import PlayerCard from "./PlayerCard";
import { PlayerDataType } from '../interfaces/types';

///////////////////////  Styled Components ///////////////////////

const PlayersListContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 20px;
    background-color: ${colors.blanc};
    padding: 20px;
    border-radius: 10px;
`;


const PlayersList: React.FC< {players: PlayerDataType[]} > = (props) => {
    return (
        <PlayersListContainer>
            {props.players.map((player, index) => (
                <PlayerCard key={index} player={player} />
            ))}
        </PlayersListContainer>
    );
};
export default PlayersList;
