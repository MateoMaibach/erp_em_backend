const express = require('express');
const sequelize = require('./config/db'); 
require('dotenv').config();
const authRoutes = require('../src/routes/authRoutes');


const app = express();
app.use(express.json());
app.use('/api/auth',authRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        
        await sequelize.authenticate();
        console.log('Base de datos conectada.');

        
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('No se pudo iniciar el servidor:', error);
    }
}

startServer();