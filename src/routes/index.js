import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

// SI NO SE ESPECIFICA UN LAYOUT, se toma por defecto el layout main.ejs
router.get('/', (_req, res) => {
	res.render('index', { title: 'Hello World from EJS' });  // A la vista index, le pasamos la variable title, aunque pudo ser un array, objeto o lo q sea.
});

router.get('/about', (_req, res) => {
	res.render('about', { title: 'About', layout: './layouts/template2' });  // A la vista index, le pasamos la variable title, aunque pudo ser un array, objeto o lo q sea.
	// Si se agrega el atributo layout y como valor se le pasa la ubicación de una plantilla dentro de la carpeta layout, con un archivo .ejs, entonces esta vista tendrá esa plantilla especificada incorporada
});

router.get('/post', async (_req, res) => {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts');
	const data = await response.json();
	//console.log(data);
	res.render('post', { post: data, layout: './layouts/template2', title: 'Posts' });  
});

export default router;