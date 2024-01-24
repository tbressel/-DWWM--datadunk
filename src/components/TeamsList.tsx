////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////

// Style importations
import styled from 'styled-components';
import { colors } from '../colors';

// Components importations
import TeamCard from "./TeamCard";

// Types importation
import { TeamDataType } from '../interfaces/types';


////////////////////////////////////////////////////////////
//////////////////   STYLE COMPONENTS   ////////////////////
////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////

const TeamsList: React.FC< {teams: TeamDataType[]} > = (props) => {
    
    return (
        <TeamsListContainer>
            {props.teams.map((team, index) => (
                <TeamCard key={index} team={team} />
            ))}
        </TeamsListContainer>
    );
};
export default TeamsList;
