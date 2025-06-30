
const sp = new URLSearchParams(window.location.search);
const id = sp.get('id')
  
async function getData() {
    try {
        const filmResponse = await fetch(`http://localhost:9001/api/films/${id}`);
        const film = await filmResponse.json();
        const characterResponse = await fetch(`http://localhost:9001/api/films/${id}/characters`);
        const characters = await characterResponse.json();
        const planetResponse = await fetch(`http://localhost:9001/api/films/${id}/planets`);
        const planets = await planetResponse.json();
        return { film, characters,  planets};
    }
    catch (error) {
        console.error('Error', error);
    }
}

async function displayData() {
    const data = await getData();

    const filmDiv = document.getElementById('info');
    const characterDiv = document.getElementById('characters');
    const planetDiv = document.getElementById('planets');

    if (data.film) {
        filmDiv.innerHTML = `<h1>${data.film.title}</h1>`;
        filmDiv.innerHTML += `<h3>Released: ${data.film.release_date}</h3>`;
        filmDiv.innerHTML += `<h3>Director: ${data.film.director}</h3>`;
        filmDiv.innerHTML += `<h3>Episode: ${data.film.episode_id}</h3>`;
    }
    
    if  (data.characters && data.characters.length > 0) {
        const characterList = data.characters.map(character =>
            `<a href="character.html?id=${character.id}">${character.name}</a>`
        ).join('<br>');
        characterDiv.innerHTML = characterList;
    }

    if  (data.planets && data.planets.length > 0) {
        const planetList = data.planets.map(planet =>
            `<a href="planet.html?id=${planet.id}">${planet.name}</a>`
        ).join('<br>');
        planetDiv.innerHTML = planetList;
    }
}

displayData();