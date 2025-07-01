import React from 'react';
import { Link } from 'react-router-dom';


const Home = ({ characters }) => {
    const renderCharacters = characters.map((character) => {
        return (
            <Link to={`/characters/${character.id}`} key={character._id} style={{textDecoration : 'none'}}>
                <button
                  style={{
                    border: '1px solid var(--dark2)',
                    padding: '10px 20px',
                    margin: '10px',
                    backgroundColor: '#87CEEB',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                    {character.name}
                </button>
            </Link>
        )
    });

    return (
        <div id="characterList" 
          style={{
            border: '1px solid var(--dark2)',  
            padding: '20px', 
            margin: '20px',
            backgroundColor: '#f0f0f0',
            borderRadius: '10px'
          }}>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '10px'
            }}>
                {renderCharacters}
            </div>
        </div>
    );
};

export default Home;