import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Planet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [planetData, setPlanetData] = useState(null);
  const [charactersData, setCharactersData] = useState([]);
  const [filmsData, setFilmsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanet = async () => {
      try {
        setLoading(true);
        
        // Fetch planet data
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/planets/${id}`);
        if (!response.ok) {
          throw new Error('Planet could not be fetched!');
        }
        const planetResponse = await response.json();
        setPlanetData(planetResponse);

        // Fetch characters for this planet
        try {
          const charactersResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/planets/${id}/characters`);
          if (charactersResponse.ok) {
            const charactersData = await charactersResponse.json();
            setCharactersData(charactersData);
          }
        } catch (err) {
          console.log('Could not fetch characters data:', err);
        }

        // Fetch films for this planet
        try {
          const filmsResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/planets/${id}/films`);
          if (filmsResponse.ok) {
            const filmsData = await filmsResponse.json();
            setFilmsData(filmsData);
          }
        } catch (err) {
          console.log('Could not fetch films data:', err);
        }
        
      } catch (error) {
        setError(error.message);
        console.error('Error fetching planet:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPlanet();
    }
  }, [id]);

  const handleCharacterClick = (characterId) => {
    navigate(`/character/${characterId}`);
  };

  const handleFilmClick = (filmId) => {
    navigate(`/film/${filmId}`);
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>Error: {error}</div>;
  if (!planetData) return <div style={{ textAlign: 'center', padding: '50px' }}>Planet not found</div>;

  return (
    <div style={{
      maxWidth: '600px',
      margin: '20px auto',
      padding: '30px',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Planet Name */}
      <h1 style={{
        fontSize: '48px',
        fontWeight: 'bold',
        marginBottom: '40px',
        color: '#000',
        textAlign: 'left'
      }}>
        {planetData.name}
      </h1>

      {/* Planet Stats */}
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
          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Climate: {planetData.climate || 'Unknown'}</div>
        </div>
        
        <div style={{
          backgroundColor: '#87CEEB',
          padding: '15px 20px',
          borderRadius: '5px',
          minWidth: '120px',
          textAlign: 'center'
        }}>
          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Terrain: {planetData.terrain || 'Unknown'}</div>
        </div>
        
        <div style={{
          backgroundColor: '#87CEEB',
          padding: '15px 20px',
          borderRadius: '5px',
          minWidth: '120px',
          textAlign: 'center'
        }}>
          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Population: {planetData.population || 'Unknown'}</div>
        </div>
      </div>

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

      {/* Films Section */}
      {filmsData.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#000'
          }}>
            Films
          </h2>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            {filmsData.map((film, index) => (
              <button
                key={index}
                onClick={() => handleFilmClick(film.id)}
                style={{
                  backgroundColor: '#87CEEB',
                  border: 'none',
                  padding: '15px 20px',
                  borderRadius: '5px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  color: '#000',
                  minWidth: '180px'
                }}
              >
                {film.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Planet;