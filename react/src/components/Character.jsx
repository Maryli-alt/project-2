import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Character = () => {
  const { id } = useParams();
  const [characterData, setCharacterData] = useState(null);
  const [planetData, setPlanetData] = useState(null);
  const [filmsData, setFilmsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        
        // Fetch character data
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/characters/${id}`);
        if (!response.ok) {
          throw new Error('Character could not be fetched!');
        }
        const characterResponse = await response.json();
        setCharacterData(characterResponse);

        // Fetch planet data using the homeworld ID
        if (characterResponse.homeworld) {
          try {
            const planetResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/planets/${characterResponse.homeworld}`);
            if (planetResponse.ok) {
              const planetData = await planetResponse.json();
              setPlanetData(planetData);
            }
          } catch (err) {
            console.log('Could not fetch planet data:', err);
          }
        }

        // Fetch film IDs first, then fetch individual film details
        try {
          const filmsIdsResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/characters/${id}/films`);
          if (filmsIdsResponse.ok) {
            const filmIds = await filmsIdsResponse.json();
            
            // Fetch details for each film
            const filmPromises = filmIds.map(filmData => 
              fetch(`${import.meta.env.VITE_API_URL}/api/films/${filmData.film_id}`)
                .then(res => res.ok ? res.json() : null)
            );
            
            const filmsDetails = await Promise.all(filmPromises);
            // Filter out any null responses
            const validFilms = filmsDetails.filter(film => film !== null);
            setFilmsData(validFilms);
          }
        } catch (err) {
          console.log('Could not fetch films data:', err);
        }
        
      } catch (error) {
        setError(error.message);
        console.error('Error fetching character:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCharacter();
    }
  }, [id]);

  const handlePlanetClick = (planetId) => {
    // Navigate to planet page
    window.location.href = `/planet/${planetId}`;
  };

  const handleFilmClick = (filmId) => {
    // Navigate to film page
    window.location.href = `/film/${filmId}`;
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>Error: {error}</div>;
  if (!characterData) return <div style={{ textAlign: 'center', padding: '50px' }}>Character not found</div>;

  return (
    <div style={{
      maxWidth: '600px',
      margin: '20px auto',
      padding: '30px',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Character Name */}
      <h1 style={{
        fontSize: '48px',
        fontWeight: 'bold',
        marginBottom: '40px',
        color: '#000',
        textAlign: 'left'
      }}>
        {characterData.name}
      </h1>

      {/* Character Stats */}
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
          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Height: {characterData.height} cm</div>
        </div>
        
        <div style={{
          backgroundColor: '#87CEEB',
          padding: '15px 20px',
          borderRadius: '5px',
          minWidth: '120px',
          textAlign: 'center'
        }}>
          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Mass: {characterData.mass} kg</div>
        </div>
        
        <div style={{
          backgroundColor: '#87CEEB',
          padding: '15px 20px',
          borderRadius: '5px',
          minWidth: '120px',
          textAlign: 'center'
        }}>
          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Born: {characterData.birth_year}</div>
        </div>
      </div>

      {/* Homeworld Section */}
      <div style={{ marginBottom: '50px' }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#000'
        }}>
          Homeworld
        </h2>
        
        <button
          onClick={() => handlePlanetClick(characterData.homeworld)}
          style={{
            backgroundColor: '#87CEEB',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '5px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            color: '#000'
          }}
        >
          {planetData?.name || 'Loading...'}
        </button>
      </div>

      {/* Films Section */}
      {filmsData.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#000'
          }}>
            Films appeared in
          </h2>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            {filmsData.map((film, index) => (
              <button
                key={index}
                onClick={() => handleFilmClick(film._id || film.id)}
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

export default Character;