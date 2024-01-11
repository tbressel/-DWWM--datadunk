import Navbar from "../components/Navbar";
import MatchesList from "../components/MatchesList";
import { useEffect, useState } from 'react';






const Matches = () => {
    const [matches, setMatches] = useState([]);
    
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/games');
            const data = await response.json();
    
            setMatches(data);
            // Écrire la variable 'data' dans le stockage local
            // localStorage.setItem('dataMatches', JSON.stringify(data));
    
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
            <Navbar />
                <h1>Matches</h1>
            <MatchesList matches = {matches}/>
        </>
    );
};
export default Matches;
