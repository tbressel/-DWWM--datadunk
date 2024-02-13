////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////

// React importations
import React, { useState, useEffect } from 'react';

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
    const [filteredMatches, setFilteredMatches] = useState<MatchDataType[]>(props.matches);
  
    useEffect(() => {
      // Mettez à jour les matches filtrés à chaque changement dans props.matches
      setFilteredMatches(props.matches);
    }, [props.matches]);
  
  
    return (
      <MatchListContainer>
        {filteredMatches.map((match, index) => (
          <MatchCard key={index} match={match} onSelectMatch={props.onSelectMatch} />
        ))}
      </MatchListContainer>
    );
  };
  
  export default MatchesList;

