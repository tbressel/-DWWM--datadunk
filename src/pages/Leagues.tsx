////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////

// React importations
import { useEffect, useState } from 'react';

// Components importations
import LeaguesList from '../components/LeaguesList';

// Types importation
import { LeagueDataType } from '../interfaces/types';

// Config importation
import { API_BASE_URL } from '../config';

////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////

const Leagues = () => {

// Represents the state of leagues.
const [leagues, setLeagues] = useState<LeagueDataType[]>([]);


// Represents the state of the selected match.
const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null);


/**
 * Function that fetches the data from the API and updates the state of matches.
 * It takes 24 in parameter which is the id of the last season.
 */
useEffect(() => {
  const fetchData = async () => {
    try {
      const sessionToken = localStorage.getItem('sessionToken');
      
      const response = await fetch(`${API_BASE_URL}/api/cards/league/`, {
        headers: {
          'Authorization': `Bearer ${sessionToken}`
        }
      });
      const data = await response.json();
      if (!response.ok) {
    
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setLeagues(data);
      console.log(data);
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
 const onSelectLeague = (id: number) => {
    const idString = id.toString();
    setSelectedLeagueId(idString);
  };

console.log(leagues);
    return (
        <>
     
    <LeaguesList leagues={leagues} onSelectLeague={onSelectLeague} />

          {/* {selectedLeagueId ? (
    <LeaguesList leagues={leagues} onSelectLeague={onSelectLeague} />
    ) : null} */}
        </>
    );
};
export default Leagues;
