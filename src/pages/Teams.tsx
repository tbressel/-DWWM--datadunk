import Navbar from "../components/Navbar";
import TeamsList from "../components/TeamsList";
import { useEffect, useState } from 'react';

const Teams = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/franchise');
                const data = await response.json();
                setTeams(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <h1>Teams</h1>
            <TeamsList teams={teams} />
        </>
    );
};

export default Teams;
