import PlayersList from "../components/PlayersList";
import { useEffect, useState } from 'react';


const Players = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseStats = await fetch('http://localhost:5000/api/stats/players/2023');
                const statsData = await responseStats.json();
                setPlayers(statsData);
                console.log(statsData);
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
