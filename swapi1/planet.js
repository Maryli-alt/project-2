let planetNameH1;
let detailsContainer;

const baseUrl = 'http://localhost:9001/api';

addEventListener('DOMContentLoaded', () => {
  planetNameH1 = document.querySelector('#planet_name');
  detailsContainer = document.querySelector('div#planet_details');

  const sp = new URLSearchParams(window.location.search);
  const id = sp.get('id');

  if (id) {
    getPlanet(id);
  }
});

async function getPlanet(id) {
  try {
    const planet = await fetchPlanet(id);
    const characters = await fetchCharacters(id);
    const films = await fetchFilms(id);
    console.log('Fetched planet data:', planet);
    renderPlanet(planet, characters, films);
  } catch (err) {
    console.error(`Error fetching planet ${id}:`, err.message);
  }
}

async function fetchPlanet(id) {
  const url = `${baseUrl}/planets/${id}`;
  const res = await fetch(url);
  return await res.json();
}

async function fetchCharacters(id) {
  const url = `${baseUrl}/planets/${id}/characters`;
  const res = await fetch(url);
  return await res.json();
}

async function fetchFilms(id) {
  const url = `${baseUrl}/planets/${id}/films`;
  const res = await fetch(url);
  return await res.json();
}

function renderPlanet(planet, characters, films) {
  document.title = `Planet - ${planet?.name}`;
  planetNameH1.textContent = planet?.name;
  detailsContainer.innerHTML = '';

  const fields = {
    Climate: planet?.climate,
    Diameter: planet?.diameter,
    Terrain: planet?.terrain,
    Gravity: planet?.gravity,
    Population: planet?.population,
    'Surface Water': planet?.surface_water,
    'Rotation Period': planet?.rotation_period,
    'Orbital Period': planet?.orbital_period,
  };

  for (const [label, value] of Object.entries(fields)) {
    const line = document.createElement('div');
    line.className = 'planet-line';
    line.innerHTML = `<strong>${label}:</strong> ${value}`;
    detailsContainer.appendChild(line);
  }

  // Characters
  const charHeader = document.createElement('h2');
  charHeader.textContent = 'Characters';
  detailsContainer.appendChild(charHeader);

  const charList = document.createElement('ul');
  for (const character of characters) {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = `character.html?id=${character.id}`;
    link.textContent = character.name;
    li.appendChild(link);
    charList.appendChild(li);
  }
  detailsContainer.appendChild(charList);

  // Films
  const filmHeader = document.createElement('h2');
  filmHeader.textContent = 'Films';
  detailsContainer.appendChild(filmHeader);

  const filmList = document.createElement('ul');
  for (const film of films) {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = `film.html?id=${film.id}`;
    link.textContent = film.title;
    li.appendChild(link);
    filmList.appendChild(li);
  }
  detailsContainer.appendChild(filmList);
}

