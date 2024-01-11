import styled from 'styled-components';
import { colors } from '../colors';

import TeamCard from "./TeamCard";

///////////////////////  Styled Components ///////////////////////

const TeamsListContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 20px;
    background-color: ${colors.blanc};
    padding: 20px;
    border-radius: 10px;
`;


const TeamsList: React.FC< {teams: any[]} > = (props) => {
    return (
        <TeamsListContainer>
            {props.teams.map((team) => (
                <TeamCard key={team.id_franchise} team={team} />
            ))}
        </TeamsListContainer>
    );
};
export default TeamsList;
