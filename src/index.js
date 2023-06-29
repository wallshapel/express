import dotenv from 'dotenv'; // Para manejar variables de entorno
import app from './app.js';
import { sequelize } from './database/database.js';
import './models/Project.js'; // Necesario para que se cree la tabla projects
import './models/Task.js'; // Necesario para que se cree la tabla tasks
import './models/User.js'; // Necesario para que se cree la tabla users

dotenv.config();

const { HOST } = process.env; // Desde el archivo .env
const PORT = app.get('PORT');

const main = async () => {
	try {
		await sequelize.sync();
		//await sequelize.authenticate(); // Probamos la conexión
		//console.log('Connection has been established successfully'); // Probamos la conexión
		app.listen(PORT, () => console.log('Server on http://' + HOST + ':' + PORT));
	} catch(e) {
		console.error('Unable to connect to the database', e);
	}
};

main();