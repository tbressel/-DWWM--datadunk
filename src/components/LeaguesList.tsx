////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////

// React importations
import React, { useState, useEffect } from 'react';

// Style importations
import styled from 'styled-components';
import { colors } from '../colors';

// Components importations
import LeagueCard from "./LeagueCard";

// Types importation
import { LeagueDataType } from '../interfaces/types';

////////////////////////////////////////////////////////////
//////////////////   STYLE COMPONENTS   ////////////////////
////////////////////////////////////////////////////////////

const LeagueListContainer = styled.div`
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
const LeaguesList: React.FC<{ leagues: LeagueDataType[]; onSelectLeague: (id: number) => void }> = (props) => {
    const [filteredLeagues, setFilteredLeagues] = useState<LeagueDataType[]>(props.leagues);
  


    
    useEffect(() => {
      setFilteredLeagues(props.leagues);
    }, [props.leagues]);
    
    
    console.log (filteredLeagues);
  
    return (
      <LeagueListContainer>
        {filteredLeagues.map((league, index) => (
          console.log(league),
          console.log(index),
          <LeagueCard key={index} league={league} onSelectLeague={props.onSelectLeague} />
        ))}
      </LeagueListContainer>
    );
  };
  
  export default LeaguesList;

