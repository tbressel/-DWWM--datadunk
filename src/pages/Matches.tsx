////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////

// React importations
import { useEffect, useState } from 'react';

// Components importations
import MatchSummary from '../components/MatchSummary';
import MatchFilter from '../components/MatchFilter';
import MatchesList from '../components/MatchesList';

// Types importation
import { MatchDataType } from '../interfaces/types';

// Config importation
import { API_BASE_URL } from '../config';


////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////

const Matches = () => {


  /**
   * Represents the state of matches.
   * @typeParam MatchDataType - The type of match data.
   */
  const [matches, setMatches] = useState<MatchDataType[]>([]);

  /**
   * Represents the state of the selected match.
   * @typeParam string - The type of match id.
   */
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);

  const [showFilter, setShowFilter] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async ()   => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/stats/games/24`);
        const data = await response.json();
        setMatches(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const onSelectMatch = (id: number) => {
    const idString = id.toString();
    setSelectedMatchId(idString);
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