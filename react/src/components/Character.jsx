import React, { useState, useEffect } from 'react';
import {useParams, Link } from 'react-router-dom';


const Character = (props) => {
    const { id } = useParams();
    const [characterData, setCharacterData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const character_response = await fetch(`${import.meta.env.VITE_API_URL}/api/characters/${id}`);
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await character_response.json();
                setCharacterData(json_response); // assign JSON response to the data variable.
            } catch (error) {
                console.error('Error fetching socks:', error);
            }
        };
    
        fetchData();
      }, []);
    
    return (
    <>
        <div>
        <h1 id="name"></h1>
        <section id="generalInfo">
            <p>Height: <span id="height"></span> cm</p>
            <p>Mass: <span id="mass"></span> kg</p>
            <p>Born: <span id="birth_year"></span></p>
        </section>
        <section id="planets">
            <h2>Homeworld</h2>
            <p><span id="homeworld">{characterData.homeworld}</span></p>
        </section>
        <section id="films">
            <h2>Films appeared in</h2>
            <ul></ul>
        </section>  
        </div>
    </>);
};

export default Character;