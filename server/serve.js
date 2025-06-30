import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());

const url = 'mongodb://localhost:27017';
const db = 'swapi';
const client = new MongoClient(url);
//console.log(client);
const PORT = 3000; 

let dbName = 'swapi';
 client.connect().then(() =>{
    dbName = client.db(db)
});

 app.get('/api/films', async (req, res) =>{
    try{
        const filmsCollection = dbName.collection('films');
        const films = await filmsCollection.find().toArray();
        console.log(films);
        res.json(films);
    }

    catch(err){
        console.error('Error retrieving data', err);
        res.status(500).json({error: 'Failed to fetch films'});
    }
});
// app.get('/api/films', async (req, res) => {
//     try {
//      // const client = await MongoClient.connect(url);
//       //const db = client.db(dbName);
//      // console.log(db);
//       const collection = db.collection('films');
//       console.log(collection)
//       const films = await collection.find({}).toArray();
//       console.log(films);
//       res.json(films);
//     } catch (err) {
//       console.error('Error:', err);
//       res.status(500).send('Death star blew the film up - no film found');
//     }
//   });


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

