import React from 'react';


const Character = (props) => {
    const e1 = document.createElement('div');
    e1.addEventListener('click', () => goToCharacterPage(character._id));
    e1.textContent = props.character.name;
    const goToCharacterPage = id => window.location = `/character.html?id=${id}`;
    
    return (
    <>
    <div >
        <a>{e1.textContent}</a>
    </div>
    </>);
};

export default Character;