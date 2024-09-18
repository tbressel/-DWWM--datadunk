////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////


import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';
import { MatchDataType } from '../../interfaces/types';
import styled from 'styled-components';
import { colors } from '../../colors';
import SwitchFilter from './SwitchFilter';


////////////////////////////////////////////////////////
////////////////   TYPES INTERFACES   ////////////////////
////////////////////////////////////////////////////////

interface MatchFilterProps {
    onFilterChange: (filteredMatches: MatchDataType[]) => void;
  }
  
interface SeasonsListDataType {
    id: number;
    season_field: string;

}
interface TeamsListDataType {
    id: number;
    team_field: string;
}
interface LeaguesListDataType {
    id: number;
    league_field: string;
}




////////////////////////////////////////////////////////////
//////////////////   STYLE COMPONENTS   ////////////////////
////////////////////////////////////////////////////////////

const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
`
const FilterForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    @media screen and (min-width: 768px) {
           display: flex;
           flex-direction: row;
        flex-wrap: wrap;
           justify-content: space-between;

        }
`
const FilterSelect = styled.select`
    padding: 15px;
    margin: 15px;
    border-radius: 15px;
    @media screen and (min-width: 768px) {
            min-width: 25%;
    }
`
const FilterButton = styled.button` 
text-align: center;
  border-radius: 50%;
  width: 83px;
  height: 83px;
  margin-left: auto;
  margin-right: auto;
`
////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////

const MatchFilter: React.FC<MatchFilterProps> = ({ onFilterChange }) => {


 
    
const [showForm, setShowForm] = useState(false);
    
    const [formData, setFormData] = useState({
        selectedSeason: '24',
        selectedLeague: '0',
        selectedTeam: '0',
    }); 

    const [seasonsList, setSeasonsList] = useState<SeasonsListDataType[]>([]);
    const [teamsList, setTeamsList] = useState<TeamsListDataType[]>([]);
    const [leaguesList, setLeaguesList] = useState<LeaguesListDataType[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseSeasons = await fetch(`${API_BASE_URL}/api/forms/seasons_list`);
                const responseTeams = await fetch(`${API_BASE_URL}/api/forms/teams_list`);
                const responseLeagues = await fetch(`${API_BASE_URL}/api/forms/leagues_list`);

                let dataSeasons = await responseSeasons.json();
                let dataTeams = await responseTeams.json();
                let dataLeagues = await responseLeagues.json();

                setSeasonsList(dataSeasons);
                setTeamsList(dataTeams);
                setLeaguesList(dataLeagues);

                // console.log('Liste des saisons : ', dataSeasons);
                // console.log('Liste des équipes : ', dataTeams);
                // console.log('Liste des ligues : ', dataLeagues);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleOptionSeason = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(prevFormData => {
            return {
                selectedSeason: event.target.value,
                selectedLeague: prevFormData.selectedLeague,
                selectedTeam: prevFormData.selectedTeam
            };
        });
    };
    const handleOptionLeague = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, selectedLeague: event.target.value });
    };

    const handleOptionTeam = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, selectedTeam: event.target.value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
          const response = await fetch(
            `${API_BASE_URL}/api/cards/matchsubmit/${formData.selectedSeason}/${formData.selectedTeam}/${formData.selectedLeague}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                selectedSeason: formData.selectedSeason,
                selectedLeague: formData.selectedLeague,
                selectedTeam: formData.selectedTeam,
              }),
             
            }
          );
    
          if (response.ok) {
            let data = await response.json();
            onFilterChange(data);

          } else {
            console.error('Erreur lors de la soumission du formulaire');
          }
          
        } catch (error) {
          console.error('Erreur lors de la soumission du formulaire:', error);
        }
      };


      const switchText = [
        { switchName: "Filtres : " },
        { leftButtonText: "On" },
        { rightButtonText: "Off" },
      ];
    
    //   console.log('Mon SWITCH TEXT', switchText);


    return (
        <FilterContainer>
           <SwitchFilter showForm={showForm} setShowForm={setShowForm} switchText={switchText}/>
            {showForm && (
                <FilterForm onSubmit={handleSubmit}>
                    
                    <FilterSelect value={formData.selectedTeam} onChange={handleOptionTeam}>
                    <option value="0">Sélection d'une équipe</option>
                        {teamsList.map((team) => (
                            <option key={team.id} value={team.id}>
                                {team.team_field}
                            </option>
                        ))};
                    </FilterSelect>

                    <FilterSelect value={formData.selectedLeague} onChange={handleOptionLeague}>
                    <option value="0">Sélection d'une ligue</option>
                        {leaguesList.map((league) => (
                            <option key={league.id} value={league.id}>
                                {league.league_field}
                            </option>
                        ))};
                    </FilterSelect>

                    <FilterSelect value={formData.selectedSeason} onChange={handleOptionSeason}>
                        {seasonsList.map((season) => (
                            <option key={season.id} value={season.id}>
                                {season.season_field}
                            </option>
                        ))};
                    </FilterSelect>

                    <FilterButton type="submit">Valider</FilterButton>
                </FilterForm>
            )}
        </FilterContainer>
    );
};

export default MatchFilter;