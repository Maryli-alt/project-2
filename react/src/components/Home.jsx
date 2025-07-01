import React from 'react';
import Character from './Character';
import "./index.css"

const Home = (props) => {


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
        <div id="characterList" >
            {
                props.data.map((character) => (
                    <Character character={character} key={character._id}/>
                ))
            }
        </div>
    );
};

export default Home;