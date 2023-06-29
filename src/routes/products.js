import { Router } from 'express';
import products from '../database.js';

const router = Router();

router.get('/api/products/', (_req, res) => {
	res.status(200).json(products);
});

router.get('/api/product/show/:id', (_req, res) => {
	const productFound = products.find((product) => {
		return product.id === parseInt(_req.params.id);
	});	
	if (productFound !== undefined)
		res.status(200).json(productFound);
	else
		res.status(404).json({message: 'Not found'});
});

router.post('/api/product/store', (_req, res) => {
	const newProduct = {..._req.body, id: products.length + 1 }; // Crea una copia de lo que traiga el objeto _req.body más el atributo id
	products.push(newProduct);
	res.status(201).json(products);
});

router.put('/api/product/update/:id', (_req, res) => {
	const id = parseInt(_req.params.id);
	const index = products.findIndex(product => product.id === id); 
	if (index >= 0) { // Se incluye el cero porque el índice de un arreglo puede ser 0
		const updatedProduct = {..._req.body, id}; // Crea una copia de '_req.body' y le añade el atributo 'id' con el valor id
		products[index] = updatedProduct;
		res.status(200).json(products);
	} else 
		res.status(404).json({message: 'Not found'});	
});

router.delete('/api/product/destroy/:id', (_req, res) => {
	const id = parseInt(_req.params.id);
	const index = products.findIndex(product => product.id === id);	
	if (index >= 0) {// Se incluye el cero porque el índice de un arreglo puede ser 0
		products.splice(index, 1); // Elimina un elemento de un arreglo por su índice. El segundo argumento es para indicar q se va a eliminar 1 y solo 1 elemento
		res.status(204).json(products);
	} else 
		res.status(404).json({message: 'Not found'});	
});

export default router;