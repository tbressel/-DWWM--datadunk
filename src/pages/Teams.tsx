import Navbar from "../components/Navbar";
import TeamsList from "../components/TeamsList";
import { useEffect } from 'react';

const fetchData = async () => {
    try {
        const response = await fetch('http://localhost:3001/api/app.js');
        const data = await response.json();

        // Écrire la variable 'data' dans le stockage local
        localStorage.setItem('dataTeams', JSON.stringify(data));

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const Teams = () => {
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <h1>Teams</h1>
            <TeamsList/>
        </>
    );
};

export default Teams;