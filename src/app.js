// Imports
import express from 'express';
import morgan from 'morgan'; // Middleware para mostar por consola las peticiones q llegan al servidor.
import products from './database.js';
import routerIndex from './routes/index.js';
import routerProducts from './routes/products.js';
import routerProjects from './routes/projects.js';
import routerTasks from './routes/tasks.js';
import routerUsers from './routes/users.js';
// Módulos necesarios para obtener entre otras cosas, la ruta de la raíz del proyecto
import { fileURLToPath } from 'url'; // Este módulo ya viene con node
import { dirname } from 'path'; // Este módulo ya viene con node

import path from 'path'; // Nos sirve para concatenar rutas sin importar el O.S 
import expressLayouts from 'express-ejs-layouts';
import favicon from 'serve-favicon';

import { verifyToken } from './helpers/jwt.js';

// Initializations
const app = express();	
const __dirname = dirname(fileURLToPath(import.meta.url)); // Ánteriormente en el módulo path, existía la constante __dirname. Ahora toca crearla desde cero

// Settings
app.set('PORT', process.env.port || 3000); // Establecemos el puerto Node del sistema operativo.
app.set('case sensitive routing', true); // case sensitive routing es un nombre reservado. En true hará que las rutas sean case sensitive. Por defecto es false si no se define.
app.set('views', path.join(__dirname, 'views')); // Indicamos que la ruta de las vistas van a estar dentro del directorio src, cuya ruta la obtenemos con __dirname y con path.join la concatenamos con la carpeta views
app.use(expressLayouts); // Módulo instalado para layouts con ejs
app.set('layout', './layouts/main'); // Indicamos que la plantilla principal va a estar en la carpeta layouts. La carpeta views ya fue establecida
app.set('view engine', 'ejs'); // Establecemos que el motor de plantillas será ejs

// Middlewares
app.use(morgan('dev'));
app.use(express.json()); // Con esto cada vez que lleguen datos de un formulario a travez de cualquier método se convertiran en objeto json.
export function ensureToken(_req, res, next) { // Usamos function en vez de función flecha para poder exportarlo hacia las rutas
	const bearerHeader = _req.headers['authorization'];
	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		if (verifyToken(bearerToken) === 1) {
			res.status(401).json({ message: 'Token expired' });	
			return;
		}
		if (verifyToken(bearerToken) === 2) {
			res.status(401).json({ message: 'Invalid signature' });	
			return;	
		}			
		_req.token = bearerToken;
		next();	
	} else
		res.status(401).json({ message: 'No token found' });
}

// Routes
app.use(routerUsers);
app.use(routerIndex);
app.use(routerProducts);
app.use(routerProjects); 
app.use(ensureToken, routerTasks); // Todas las rutas de tareas necesitan tener un token generado. El middleware ensureToken se encarga de que así sea.

// Static files
app.use(express.static(path.join(__dirname, 'public'))); // Indicamos que la ruta de la carpeta public va a ser __dirname, que contiene la ruta de la raíz del proyecto; más la carpeta public
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

export default app;