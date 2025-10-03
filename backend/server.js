// server.js
const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get('/api', (req, res) => {
    res.json({message: 'Hola javiersito'});
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

module.exports = app;