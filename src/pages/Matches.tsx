////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////

// React importations
import { useEffect, useState } from 'react';

// Components importations
import MatchSummary from '../components/MatchSummary';
import MatchFilter from '../components/subcomponents/MatchFilter';
import MatchesList from '../components/MatchesList';

// Types importation
import { MatchDataType } from '../interfaces/types';

// Config importation
import { API_BASE_URL } from '../config';

////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////

const Matches = () => {

// Represents the state of matches.
  const [matches, setMatches] = useState<MatchDataType[]>([]);

// Represents the state of the selected match.
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);

// Represents the state of the filter.
  const [showFilter, setShowFilter] = useState<boolean>(true);




/**
 * Function that fetches the data from the API and updates the state of matches.
 * It takes 24 in parameter which is the id of the last season.
 */
  useEffect(() => {
    const fetchData = async ()   => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/cards/games/24`);
        const data = await response.json();
        setMatches(data);
        console.log("Liste des matchs",data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);





  /**
   * 
   * Function that handles the selection of a match and updates the state of selectedMatchId.
   * @param id 
   */
  const onSelectMatch = (id: number) => {
    const idString = id.toString();
    // Get the id of the selected match and update the state of selectedMatchId
    setSelectedMatchId(idString);
    // Hide filters when a match is selected
    setShowFilter(false);
  };





  /**
   * Function that handles the change of the filter while using setMatches function to update the state of matches.
   * @param filteredMatches 
   */
  const handleFilterChange = (filteredMatches: MatchDataType[]) => {
        setMatches(filteredMatches);
  };




  
  return (
    <>
   {showFilter && <MatchFilter onFilterChange={handleFilterChange} />}
      
      {selectedMatchId ? (
        <MatchSummary matchId={selectedMatchId} matches={matches}/>
      ) : (
        <MatchesList matches={matches} onSelectMatch={onSelectMatch} />
      )}
    </>
  );
};

export default Matches;