////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////


import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import { MatchDataType } from '../interfaces/types';
import styled from 'styled-components';
import { colors } from '../colors';

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
    @media screen and (min-width: 768px) {
           

        }
`;
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
`;
const FilterSelect = styled.select`
    padding: 15px;
    margin: 15px;
    border-radius: 15px;
    @media screen and (min-width: 768px) {
            min-width: 25%;

        }
`;
const SwitchContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;

`;
const SwitchText = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px 5px;
`;
const ButtonContainer = styled.div`
    display: flex;
    height: 28px;
    padding: 2px;
    border-radius: 9px;
    background: ${colors.violet2};
`;
const ButtonLeft = styled.div`
    display: flex;
    padding: 3px 10px;
    border-radius: 7px;
    transition: 300ms ease-in-out;


    &.active {
        border: 0.5px solid rgba(0, 0, 0, 0.04);
        background: ${colors.violet1};
        box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.04), 0px 3px 8px 0px rgba(0, 0, 0, 0.12);
        font-family: 'Barlow Bold';
        transition: 300ms ease-in-out;
    }

p {
    display: flex;
    width: 40px;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 13px;
}
`;
const ButtonRight = styled.div`
    display: flex;
    padding: 3px 10px;
    border-radius: 7px;
    font-family: 'Barlow Regular';
    transition: 300ms ease-in-out;


    &.active {
        border: 0.5px solid rgba(0, 0, 0, 0.04);
        background: ${colors.violet1};
        box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.04), 0px 3px 8px 0px rgba(0, 0, 0, 0.12);
        font-family: 'Barlow Bold';
        transition: 300ms ease-in-out;

    }

p {
    display: flex;
    width: 47px;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 13px;


}
`;
const FilterButton = styled.button` 
text-align: center;
  border-radius: 50%;
  width: 83px;
  height: 83px;
  margin-left: auto;
  margin-right: auto;


@media screen and (min-width: 768px) {


        }


`

////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////

const MatchFilter: React.FC<MatchFilterProps> = ({ onFilterChange }) => {

    const [formData, setFormData] = useState({
        selectedSeason: '24',
        selectedLeague: '0',
        selectedTeam: '0',
    });

    const [seasonsList, setSeasonsList] = useState<SeasonsListDataType[]>([]);
    const [teamsList, setTeamsList] = useState<TeamsListDataType[]>([]);
    const [leaguesList, setLeaguesList] = useState<LeaguesListDataType[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [toggleButton, setToggleButton] = useState(false);

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

                console.log('Liste des saisons : ', dataSeasons);
                console.log('Liste des équipes : ', dataTeams);
                console.log('Liste des ligues : ', dataLeagues);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleOptionSeason = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, selectedSeason: event.target.value });
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
            const response = await fetch(`${API_BASE_URL}/api/stats/matchsubmit/${formData.selectedSeason}/${formData.selectedTeam}/${formData.selectedLeague}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    selectedSeason: formData.selectedSeason,
                    selectedLeague: formData.selectedLeague,
                    selectedTeam: formData.selectedTeam,

                }),
            });

            if (response.ok) {
                let data = await response.json();
                console.log(data);
                console.log('Formulaire soumis avec succès');
                onFilterChange(data);
            } else {
                console.error('Erreur lors de la soumission du formulaire');
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire:', error);
        }
    };


    const handleToggleForm = () => {
        setShowForm(!showForm);
        setToggleButton(!toggleButton);
    };



    return (
        <FilterContainer>
            <SwitchContainer onClick={handleToggleForm}>
                <SwitchText>
                    <p>Filtres :</p>
                </SwitchText>
                <ButtonContainer>
                    <ButtonLeft className={toggleButton ? 'active' : ''}>
                        <p>
                            On
                        </p>
                    </ButtonLeft>
                    <ButtonRight className={toggleButton ? '' : 'active'}>
                        <p>
                            Off
                        </p>
                    </ButtonRight>
                </ButtonContainer>
            </SwitchContainer>

            {showForm && (
                <FilterForm onSubmit={handleSubmit}>
                    {/* <FilterInput type="text" value={inputValue} onChange={handleInputChange} /> */}

                    <FilterSelect value={formData.selectedTeam} onChange={handleOptionTeam}>
                    <option value="0">Sélection d'une équipe</option>
                        {teamsList.map((team) => (
                            <option key={team.id} value={team.id}>
                                {team.team_field}
                            </option>
                        ))}
                    </FilterSelect>

                    <FilterSelect value={formData.selectedLeague} onChange={handleOptionLeague}>
                    <option value="0">Sélection d'une ligue</option>
                        {leaguesList.map((league) => (
                            <option key={league.id} value={league.id}>
                                {league.league_field}
                            </option>
                        ))}
                    </FilterSelect>

                    <FilterSelect value={formData.selectedSeason} onChange={handleOptionSeason}>
                        {seasonsList.map((season) => (
                            <option key={season.id} value={season.id}>
                                {season.season_field}
                            </option>
                        ))}
                    </FilterSelect>

                    <FilterButton type="submit">Valider</FilterButton>
                </FilterForm>
            )}
        </FilterContainer>
    );
};

export default MatchFilter;