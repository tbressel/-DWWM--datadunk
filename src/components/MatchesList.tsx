////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////

// Style importations
import styled from 'styled-components';
import { colors } from '../colors';

// Components importations
import MatchCard from "./MatchCard";

// Types importation
import { MatchDataType } from '../interfaces/types';

////////////////////////////////////////////////////////////
//////////////////   STYLE COMPONENTS   ////////////////////
////////////////////////////////////////////////////////////

const MatchListContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 20px;
    background-color: ${colors.blanc};
    padding: 20px;
    border-radius: 10px;
`;

////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////
const MatchesList: React.FC<{ matches: MatchDataType[]; onSelectMatch: (id: number) => void }> = (props) => {

    return (
        <MatchListContainer>
            {props.matches.map((match, index) => (
        <MatchCard key={index} match={match} onSelectMatch={props.onSelectMatch} />
         ))}
        </MatchListContainer>   
    );
};
export default MatchesList;

