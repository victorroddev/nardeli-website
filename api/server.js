// api/server.js

// Paso 1: Cambiamos los 'import' por 'require' (sintaxis CommonJS)
const express = require('express');
const cors = require('cors');

const app = express();

// La configuración de los middlewares se queda igual
app.use(express.json());
app.use(cors());

// Tu ruta de prueba se queda igual
app.get('/api/test', (req, res) => {
    res.json({ message: 'La API funciona correctamente' });
});

// Aquí puedes añadir más rutas que necesites, por ejemplo para tu formulario
// app.post('/api/contact', (req, res) => { ... });

// Paso 2: Eliminamos app.listen() y en su lugar exportamos la app.
// Esto es lo que Vercel necesita para ejecutar tu código.
module.exports = app;