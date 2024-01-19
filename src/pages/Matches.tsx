import MatchesList from "../components/MatchesList";
import { useEffect, useState } from 'react';



const Matches = () => {
    const [matches, setMatches] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/stats/games/2023');
                let data = await response.json();
                setMatches(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, []);


    return (
        <>
       
    
              
            <MatchesList matches = {matches}/>
        </>
    );
};
export default Matches;
