import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import MatchSummary from '../components/MatchSummary';
import { MatchDataType } from '../interfaces/types';
import MatchFilter from '../components/MatchFilter';
import MatchesList from '../components/MatchesList';

const Matches = () => {
  const [matches, setMatches] = useState<MatchDataType[]>([]);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
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
  };

  const handleFilterChange = (filteredMatches: MatchDataType[]) => {
    // Mettez à jour les matches dans MatchesList lorsqu'ils changent
    setMatches(filteredMatches);
  };

  return (
    <>
      <MatchFilter onFilterChange={handleFilterChange} />
      {selectedMatchId ? (
        <MatchSummary matchId={selectedMatchId} />
      ) : (
        <MatchesList matches={matches} onSelectMatch={onSelectMatch} />
      )}
    </>
  );
};

export default Matches;