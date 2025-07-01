import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Link
// } from "react-router-dom";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/characters`);
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                setData(json_response); // assign JSON response to the data variable.
            } catch (error) {
                console.error('Error fetching socks:', error);
            }
        };
    
        fetchData();
      }, []);

  const renderCharacters = characters => {
        const divs = characters.map(character => {
          const el = document.createElement('div');
          el.addEventListener('click', () => goToCharacterPage(character.id));
          el.textContent = character.name;
          return el;
        })
        charactersList.replaceChildren(...divs)
  }

  return (
    <>
      <Home data={data}/>
    </>
  )
}

export default App
