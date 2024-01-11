import styled from 'styled-components';
import { colors } from '../colors';

import MatchCard from "./MatchCard";

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


const MatchesList = () => {
    return (
        <MatchListContainer>
        <MatchCard/>
        <MatchCard/>
        <MatchCard/>
        <MatchCard/>
        <MatchCard/>
        <MatchCard/>
        <MatchCard/>
        <MatchCard/>
        <MatchCard/>
        <MatchCard/>
        <MatchCard/>
        <MatchCard/>
        <MatchCard/>
        <MatchCard/>
        <MatchCard/>
        <MatchCard/>
        <MatchCard/>
        <MatchCard/>
        </MatchListContainer>   
    )
}

export default MatchesList;