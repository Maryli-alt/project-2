import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Character from './components/Character'

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

  return (
    <>
      <Router>
        <div className="App">
          <header className="App-header"> 
            <h1>Star Wars Universe Lookup</h1>
          </header>
          <Routes>
            <Route path="/" element={<Home characters={data} />}/>
            <Route path="/characters/:id" element={<Character/>}/>
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
