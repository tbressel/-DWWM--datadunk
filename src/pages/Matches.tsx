import MatchesList from "../components/MatchesList";
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import MatchSummary from "../components/MatchSummary";

import { MatchDataType } from '../interfaces/types';
import MatchFilter from "../components/MatchFilter";

const Matches = () => {
    const [matches, setMatches] = useState<MatchDataType[]>([]);
    const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${ API_BASE_URL }/api/stats/games/24`);
                let data = await response.json();
                setMatches(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, []);
    
    const onSelectMatch = (id: number) => {
        // Mettez à jour l'état pour afficher MatchSummary avec l'ID sélectionné
        const idString = id.toString();
        setSelectedMatchId(idString);
      };

    return (
        <>

        <MatchFilter />




        {selectedMatchId ? (
          // Afficher MatchSummary avec l'ID sélectionné
          <MatchSummary matchId={selectedMatchId} />
        ) : (
          // Afficher MatchesList avec la fonction onSelectMatch
          <MatchesList matches={matches} onSelectMatch={onSelectMatch} />
        )}
      </>
    );
};
export default Matches;