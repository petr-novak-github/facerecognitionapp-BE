const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
//const { Client } = require('pg');


const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require ('./controllers/profile');
const image = require ('./controllers/image');



const db = knex ({
   client: 'pg',
 connection: {
    connectionString: process.env.DATABASE_URL,
  ssl: true
  }
 });

db.select('*').from('users').then(data => {console.log(data)});

/*const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT * FROM users;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});*/


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {res.send('its working !!')});

app.post('/signin', (req, res) =>  { signin.handleSignIn (req, res, db, bcrypt) });
app.post('/register', (req, res) =>  { register.handleRegister (req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) =>  { profile.handleProfileGet (req, res, db) });
app.put('/image', (req, res) =>  { image.handleImage (req, res, db) });
app.post('/imageurl', (req, res) =>  { image.handleApiCall (req, res) });
 

app.listen(process.env.PORT || 3001, ()=>{
    console.log(`app is running on port ${process.env.PORT}`);
})
