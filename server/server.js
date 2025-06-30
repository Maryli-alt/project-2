import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collChars = process.env.MONGO_COLLECTION_CHARS;
const collFilms = process.env.MONGO_COLLECTION_FILMS;
const collPlans = process.env.MONGO_COLLECTION_PLANS;
const collFilmsChars = process.env.MONGO_COLLECTION_FILMS_CHARS;
const collFilmsPlans = process.env.MONGO_COLLECTION_FILMS_PLANS;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('./public'));
const PORT = 3000;

app.get('/api/planets', async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collPlans);
    const planets = await collection.find({}).toArray();
    res.json(planets);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Death star blew the planet up - no planet found');
  }
});

app.get('/api/films', async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collFilms);
    const films = await collection.find({}).toArray();
    res.json(films);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Death star blew the film up - no film found');
  }
});

app.get('/api/characters', async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collChars);
    const characters = await collection.find({}).toArray();
    res.json(characters);
  } catch (err) {
    console.error('Error:', err);
    res
      .status(500)
      .send('Death star blew the character up - no character found');
  }
});

app.get('/api/planets/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collPlans);
    const result = await collection.findOne({ id: id });
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send('No planet found');
    }
  } catch (err) {
    console.error('Error', err);
    res.status(500).send('Death star blew the planet up - no planet found');
  }
});

app.get('/api/characters/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collChars);
    const result = await collection.findOne({ id: id });
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send('No character found');
    }
  } catch (err) {
    console.error('Error', err);
    res
      .status(500)
      .send('Death star blew the character up - no character found');
  }
});

app.get('/api/films/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collFilms);
    const result = await collection.findOne({ id: id });
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send('No film found');
    }
  } catch (err) {
    console.error('Error', err);
    res.status(500).send('Death star blew the film up - no film found');
  }
});

app.get('/api/films/:id/characters', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collFilmsChars);
    const result = await collection.find({ film_id: id }).toArray();
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send('No characters found');
    }
  } catch (err) {
    console.error('Error', err);
    res
      .status(500)
      .send('Death star blew the characters up - no characters found');
  }
});

app.get('/api/films/:id/planets', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collFilmsPlans);
    const result = await collection.find({ film_id: id }).toArray();
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send('No planets found');
    }
  } catch (err) {
    console.error('Error', err);
    res.status(500).send('Death star blew the planets up - no planets found');
  }
});

app.get('/api/characters/:id/films', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collFilmsChars);
    const result = await collection.find({ character_id: id }).toArray();
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send('No films found');
    }
  } catch (err) {
    console.error('Error', err);
    res.status(500).send('Death star blew the films up - no films found');
  }
});

app.get('/api/planets/:id/films', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collFilmsPlans);
    const result = await collection.find({ planet_id: id }).toArray();
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send('No films found');
    }
  } catch (err) {
    console.error('Error', err);
    res.status(500).send('Death star blew the films up - no films found');
  }
});

app.get('/api/planets/:id/characters', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collChars);
    const result = await collection.find({ homeworld: id }).toArray();

    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send('No characters found');
    }
  } catch (err) {
    console.error('Error', err);
    res
      .status(500)
      .send('Death star blew the characters up - no characters found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
