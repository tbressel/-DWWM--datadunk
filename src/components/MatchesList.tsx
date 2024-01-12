import styled from 'styled-components';
import { colors } from '../colors';

import MatchCard from "./MatchCard";
import { MatchDataType } from '../interfaces/types';

///////////////////////  Styled Components ///////////////////////

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


const MatchesList: React.FC < {matches : MatchDataType[]}> = (props) => {
    return (
        <MatchListContainer>
            {props.matches.map((match, index) => (
        <MatchCard key={index} match={match}/>
            ))}
        </MatchListContainer>   
    );
};
export default MatchesList;
