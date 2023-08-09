require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 4000;



// app.get('/', (req, res) => {
//   res.send("<h1>Bienvenido a la API de Perros</h1><p>Explora información sobre perros y razas.</p>");
// });


// app.get('/', async (req, res) => {
//   res.send("API - DOGS")
// });




app.get('/', (req, res) => {
  const styles = `
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        text-align: center;
        margin: 0;
        padding: 100px;
      }
      h1 {
        color: #333;
      }
      p {
        color: #666;
      }
    </style>
  `;
  
  const content = `
    <h1>Bienvenido a la API de Perros</h1>
    <p>Explora información sobre perros y razas.</p>
    <a href='/all-dogs'>Obtener nombres de todas las razas de perros existentes</a><br>
    <a href='/subtypes/:breed'>Obtener imágenes de todos los subtipos de una raza de perro</a><br>
    <a href='/all-dogs'>Ver todos los perros existentes</a><br>
    <a href='/all-dogs'>Ver todos los perros existentes</a>
  `;

  res.send(styles + content);
});



app.get('/all-dogs', async (req, res) => {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/list/all');
    const allDogs = Object.keys(response.data.message);
    res.json(allDogs);
  } catch (error) {
    console.error('Error fetching dog breeds:', error);
    res.status(500).json({ error: 'An error occurred while fetching dog breeds.' });
  }
});


app.get('/subtypes/:breed', async (req, res) => {
  const { breed } = req.params;
  try {
    const response = await axios.get(`https://dog.ceo/api/breed/${breed}/list`);
    const subtypes = response.data.message;
    res.json({ subtypes });
  } catch (error) {
    console.error('Error fetching dog subtypes:', error);
    res.status(500).json({ error: 'An error occurred while fetching dog subtypes.' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
