import TeamsList from "../components/TeamsList";
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';


const Teams = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/stats/franchise/2023`);
                const data = await response.json();
                setTeams(data);
                console.log(data);
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
