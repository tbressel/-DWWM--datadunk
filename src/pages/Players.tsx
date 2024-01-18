import PlayersList from "../components/PlayersList";
import { useEffect, useState } from 'react';


const Players = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/players');
                const data = await response.json();
                setPlayers(data);
                console.log(data);
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
