////////////////////////////////////////////////////////
//////////////////   IMPORTATIONS   ////////////////////
////////////////////////////////////////////////////////

import TeamsList from "../components/TeamsList";

// React importations
import { useEffect, useState } from 'react';

// Config importation
import { API_BASE_URL } from '../config';

////////////////////////////////////////////////////////////
//////////////////   MAIN COMPONENT   //////////////////////
////////////////////////////////////////////////////////////
const Teams = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/cards/franchise/2023`);
                const data = await response.json();
                setTeams(data);
                console.log('Liste des équipes : ',data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <TeamsList teams={teams} />
        </>
    );
};

export default Teams;
