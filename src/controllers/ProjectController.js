import Project from '../models/Project.js';
import Task from '../models/Task.js'; // Importamos el modelo de tareas para poder hacer consultas de tareas por proyectos.

export const index = async (_req, res) => {
	try {
		const projects = await Project.findAll();
		res.send(projects);
	} catch(e) {
		res.status(500).json({ message: e.message });
	}	
};

export const show = async (_req, res) => {
	const { id } = _req.params;
	try {
		const searchedProject = await Project.findByPk(id); // Busca un registro por su llave primaria
		if (!searchedProject) return res.status(404).json({ message: 'The project does not exists' });
		res.json(searchedProject);
	} catch(e) {
		res.status(500).json({ message: e.message });
	}	
};

export const store = async (_req, res) => {
	const { name, priority, description } = _req.body;
	try {
		const newProject = await Project.create({
			name,
			description,
			priority
		});
		res.status(201).send(newProject);
	} catch(e) {
		res.status(500).json({ message: e.message });
	}	
};

export const update = async (_req, res) => {
	const { id } = _req.params;
	const { name, description, priority } = _req.body;
	try {
		const searchedProject = await Project.findByPk(id); // Busca un registro por su llave primaria
		if (!searchedProject) return res.status(404).json({ message: 'The project does not exists' });
		searchedProject.name = name;		
		searchedProject.description = description;
		searchedProject.priority = priority;
		await searchedProject.save();
		res.json(searchedProject);
	} catch(e) {
		res.status(500).json({ message: e.message });
	}	
};

export const destroy = async (_req, res) => {
	const { id } = _req.params;
	try {
		await Project.destroy({
			where: {
				id 
			}
		});
		res.sendStatus(204); // La diferencia con status, es q estatus no termina el proceso de respuesta.
	} catch(e) {
		res.status(500).json({ message: e.message });
	}	
};

export const getTasksByProjectId = async (_req, res) => {
	const { id } = _req.params;
	try {
		const searchedProject = await Task.findAll({
			where: {
				projectId: id
			}
		});
		if (!searchedProject) return res.status(404).json({ message: 'The project does not exists' })
		res.json(searchedProject);
	} catch(e) {
		res.status(500).json({ message: e.message });
	}	
};