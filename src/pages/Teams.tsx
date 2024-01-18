import TeamsList from "../components/TeamsList";
import { useEffect, useState } from 'react';



const Teams = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/franchise/2023');
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
       
         
            <h1>Teams</h1>
        
       

            <TeamsList teams={teams} />
        </>
    );
};

export default Teams;
