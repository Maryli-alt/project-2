import React from 'react';
import {useParams, useState, useEffect} from 'react-router-dom';


const Character = (props) => {
    const id = useParams();
    const [characterData, setCharacterData] = useState([]);
    const [planetData, setPlanetData] = useState([]);
    const [] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const character_response = await fetch(`${import.meta.env.VITE_API_URL}/api/characters/${id}`);
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await Characterresponse.json();
                setData(json_response); // assign JSON response to the data variable.
            } catch (error) {
                console.error('Error fetching socks:', error);
            }
        };
    
        fetchData();
      }, []);
    
    return (
    <>
        <div>

        </div>
    </>);
};

export default Character;