const axios = require('axios');
const Localidad = require('./src/models/Localidad'); 
const sequelize = require('./src/config/db');

async function importar() {
    try {
        console.log("Conectando a la base de datos...");
        await sequelize.authenticate();

        console.log("Descargando localidades de Argentina (Georef AR)...");
        const response = await axios.get('https://apis.datos.gob.ar/georef/api/municipios?max=5000');
        
        const municipios = response.data.municipios.map(m => ({
            id_localidad: parseInt(m.id),
            nombre_localidad: m.nombre,
            provincia: m.provincia.nombre
        }));

        console.log(`Se obtuvieron ${municipios.length} localidades.`);
        
        await Localidad.bulkCreate(municipios, { ignoreDuplicates: true });
        
        console.log("¡Importación exitosa! Ya puedes cargar ficheros.");
        process.exit(0);
    } catch (error) {
        console.error("Error en la importación:", error.message);
        process.exit(1);
    }
}

importar();