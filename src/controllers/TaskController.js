import Task from '../models/Task.js';

export const index = async (_req, res) => {
	try {
		const tasks = await Task.findAll();
		res.send(tasks);	
	} catch(e) {
		res.status(500).json({ message: e.message });
	}	
};

export const show = async (_req, res) => {
	const { id } = _req.params;
	try {
		const searchedTask = await Task.findByPk(id); // Busca un registro por su llave primaria
		if (!searchedTask) return res.status(404).json({ message: 'The task does not exists' })
		res.json(searchedTask);	
	} catch(e) {
		res.status(500).json({ message: e.message });
	}	
};

export const store = async (_req, res) => {
	const { name, done, projectId } = _req.body;
	try {
		const newTask = await Task.create({
			name,
			done,
			projectId
		});
		res.status(201).send(newTask);	
	} catch(e) {
		res.status(500).json({ message: e.message });
	}	
};

export const update = async (_req, res) => {
	const { id } = _req.params;
	const { name, done, projectId } = _req.body;
	try {
		const searchedTask = await Task.findByPk(id); // Busca un registro por su llave primaria
		if (!searchedTask) return res.status(404).json({ message: 'The task does not exists' })
		searchedTask.name = name;		
		searchedTask.done = done;
		searchedTask.projectId = projectId;
		await searchedTask.save();
		res.json(searchedTask);	
	} catch(e) {
		res.status(500).json({ message: e.message });
	}	
};

export const destroy = async (_req, res) => {
	const { id } = _req.params;
	try {
		await Task.destroy({
			where: {
				id 
			}
		});
		res.sendStatus(204); // La diferencia con status, es q estatus no termina el proceso de respuesta.	
	} catch(e) {
		res.status(500).json({ message: e.message });
	}	
};