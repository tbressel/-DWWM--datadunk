import PlayersList from "../components/PlayersList";
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';

const Players = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseStats = await fetch(`${API_BASE_URL}/api/cards/players/2023`);
                const statsData = await responseStats.json();
                setPlayers(statsData);
                console.log('Liste des joueurs : ',statsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
        

            <PlayersList players={players} />
        </>
    );
};

export default Players;
