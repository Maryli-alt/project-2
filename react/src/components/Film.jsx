import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Film = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filmData, setFilmData] = useState(null);
  const [charactersData, setCharactersData] = useState([]);
  const [planetsData, setPlanetsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        setLoading(true);
        
        // Fetch film data
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/films/${id}`);
        if (!response.ok) {
          throw new Error('Film could not be fetched!');
        }
        const filmResponse = await response.json();
        setFilmData(filmResponse);

        // Fetch characters for this film - get full character details
        try {
          const charactersIdsResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/films/${id}/characters`);
          if (charactersIdsResponse.ok) {
            const characterIds = await charactersIdsResponse.json();
            
            // Fetch details for each character
            const characterPromises = characterIds.map(characterData => 
              fetch(`${import.meta.env.VITE_API_URL}/api/characters/${characterData.character_id}`)
                .then(res => res.ok ? res.json() : null)
            );
            
            const charactersDetails = await Promise.all(characterPromises);
            // Filter out any null responses
            const validCharacters = charactersDetails.filter(character => character !== null);
            setCharactersData(validCharacters);
          }
        } catch (err) {
          console.log('Could not fetch characters data:', err);
        }

        // Fetch planets for this film - get full planet details
        try {
          const planetsIdsResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/films/${id}/planets`);
          if (planetsIdsResponse.ok) {
            const planetIds = await planetsIdsResponse.json();
            
            // Fetch details for each planet
            const planetPromises = planetIds.map(planetData => 
              fetch(`${import.meta.env.VITE_API_URL}/api/planets/${planetData.planet_id}`)
                .then(res => res.ok ? res.json() : null)
            );
            
            const planetsDetails = await Promise.all(planetPromises);
            // Filter out any null responses
            const validPlanets = planetsDetails.filter(planet => planet !== null);
            setPlanetsData(validPlanets);
          }
        } catch (err) {
          console.log('Could not fetch planets data:', err);
        }
        
      } catch (error) {
        setError(error.message);
        console.error('Error fetching film:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFilm();
    }
  }, [id]);

  const handleCharacterClick = (characterId) => {
    navigate(`/characters/${characterId}`);
  };

  const handlePlanetClick = (planetId) => {
    navigate(`/planets/${planetId}`);
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>Error: {error}</div>;
  if (!filmData) return <div style={{ textAlign: 'center', padding: '50px' }}>Film not found</div>;

  return (
    <div style={{
      maxWidth: '600px',
      margin: '20px auto',
      padding: '30px',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Film Title */}
      <h1 style={{
        fontSize: '48px',
        fontWeight: 'bold',
        marginBottom: '40px',
        color: '#000',
        textAlign: 'left'
      }}>
        {filmData.title}
      </h1>

      {/* Film Stats */}
      <div style={{
        display: 'flex',
        gap: '20px',
        marginBottom: '50px',
        flexWrap: 'wrap'
      }}>
        <div style={{
          backgroundColor: '#87CEEB',
          padding: '15px 20px',
          borderRadius: '5px',
          minWidth: '120px',
          textAlign: 'center'
        }}>
          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Director: {filmData.director || 'Unknown'}</div>
        </div>
        
        <div style={{
          backgroundColor: '#87CEEB',
          padding: '15px 20px',
          borderRadius: '5px',
          minWidth: '120px',
          textAlign: 'center'
        }}>
          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Release Date: {filmData.release_date || 'Unknown'}</div>
        </div>
        
        <div style={{
          backgroundColor: '#87CEEB',
          padding: '15px 20px',
          borderRadius: '5px',
          minWidth: '120px',
          textAlign: 'center'
        }}>
          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Episode: {filmData.episode_id || 'Unknown'}</div>
        </div>
      </div>

      {/* Opening Crawl */}
      {filmData.opening_crawl && (
        <div style={{ marginBottom: '50px' }}>
          <div style={{
            backgroundColor: '#e6f3ff',
            padding: '20px',
            borderRadius: '8px',
            fontSize: '16px',
            lineHeight: '1.6',
            color: '#333'
          }}>
            {filmData.opening_crawl}
          </div>
        </div>
      )}

      {/* Characters Section */}
      {charactersData.length > 0 && (
        <div style={{ marginBottom: '50px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#000'
          }}>
            Characters
          </h2>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            {charactersData.map((character, index) => (
              <button
                key={index}
                onClick={() => handleCharacterClick(character.id)}
                style={{
                  backgroundColor: '#87CEEB',
                  border: 'none',
                  padding: '15px 20px',
                  borderRadius: '5px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  color: '#000',
                  minWidth: '120px'
                }}
              >
                {character.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Planets Section */}
      {planetsData.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#000'
          }}>
            Planets
          </h2>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            {planetsData.map((planet, index) => (
              <button
                key={index}
                onClick={() => handlePlanetClick(planet.id)}
                style={{
                  backgroundColor: '#87CEEB',
                  border: 'none',
                  padding: '15px 20px',
                  borderRadius: '5px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  color: '#000',
                  minWidth: '120px'
                }}
              >
                {planet.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Film;