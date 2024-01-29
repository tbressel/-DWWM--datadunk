////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////


import styled from 'styled-components';
import { colors } from '../colors';
import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

interface SeasonsListDataType {
    id: number;
    season_field: string;
}




////////////////////////////////////////////////////////////
//////////////////   STYLE COMPONENTS   ////////////////////
////////////////////////////////////////////////////////////


const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
`;
const FilterForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
const FilterInput = styled.input`
    padding: 15px;
    margin: 15px;
    border-radius: 15px;
`;
const FilterSelect = styled.select`
    padding: 15px;
    margin: 15px;
    border-radius: 15px;
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
    display: inline-flex;
    height: 28px;
    padding: 2px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 9px;
    background: var(--Violet-2, #CFCBE1);
`;

const ButtonLeft = styled.div`
    display: flex;
    padding: 3px 11px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 7px;
    border: 0.5px solid rgba(0, 0, 0, 0.04);
    background: var(--Violet-1, #F3F2F8);
    box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.04), 0px 3px 8px 0px rgba(0, 0, 0, 0.12);

p {
    display: flex;
    width: 40px;
    flex-direction: column;
    justify-content: center;
    align-self: stretch;
    overflow: hidden;
    color: var(--Violet-4, #4B4375);
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: 'Barlow Bold';
    font-size: 13px;
    font-style: normal;
    font-weight: 700;
    line-height: 18px;
}
`;

const ButtonRight = styled.div`
    display: flex;
    padding: 3px 10px;
    align-items: center;
    align-self: stretch;

p {
    display: flex;
    width: 47px;
    flex-direction: column;
    justify-content: center;
    align-self: stretch;
    overflow: hidden;
    color: var(--Violet-5, #110F1A);
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: 'Barlow Regular';
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
}
`;



////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////

const MatchFilter = () => {
    const [seasonsList, setSeasonsList] = useState<SeasonsListDataType[]>([]);

    const [selectedSeason, setSelectedSeason] = useState('');
    const [selectedLeague, setSelectedLeague] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');

    const [inputValue, setInputValue] = useState('');

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/forms/seasons_list`);
                let data = await response.json();
                setSeasonsList(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleOptionSeason = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSeason(event.target.value);
    };
    const handleOptionLeague = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLeague(event.target.value);
    };
    const handleOptionTeam = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTeam(event.target.value);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch(`${API_BASE_URL}/api/stats/games/${selectedSeason}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                let data = await response.json();
                setSelectedSeason(data);
                console.log(data);
                console.log('Formulaire soumis avec succès');
            } else {
                console.error('Erreur lors de la soumission du formulaire');
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire:', error);
        }
    };

    const handleToggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <FilterContainer>

            <SwitchContainer onClick={handleToggleForm}>
                <SwitchText>
                    <p>Filtres :</p>
                </SwitchText>

                <ButtonContainer>
                    <ButtonLeft className='active'>
                        <p>
                            On
                        </p>
                    </ButtonLeft>
                    <ButtonRight>

                        <p>
                            Off
                        </p>
                    </ButtonRight>
                </ButtonContainer>



            </SwitchContainer>







            {showForm && (
                <FilterForm onSubmit={handleSubmit}>
                    <FilterInput type="text" value={inputValue} onChange={handleInputChange} />

                    <FilterSelect value={selectedTeam} onChange={handleOptionTeam}>
                        {/* {teamsList.map((team) => (
                            <option key={team.id} value={team.id}>
                                {team.team_field}
                            </option>
                        ))} */}
                    </FilterSelect>
                    <FilterSelect value={selectedLeague} onChange={handleOptionLeague}>
                        {/* {leaguesList.map((league) => (
                            <option key={league.id} value={league.id}>
                                {league.league_field}
                            </option>
                        ))} */}
                    </FilterSelect>
                    <FilterSelect value={selectedSeason} onChange={handleOptionSeason}>
                        {seasonsList.map((season) => (
                            <option key={season.id} value={season.id}>
                                {season.season_field}
                            </option>
                        ))}
                    </FilterSelect>

                    <button type="submit">Submit</button>
                </FilterForm>
            )}
        </FilterContainer>
    );
};

export default MatchFilter;