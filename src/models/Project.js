import { DataTypes } from 'sequelize'; // Trae los tipos de datos que maneja el ORM Sequelize
import { sequelize } from '../database/database.js'; // Traemos la conección establecida
import Task from './Task.js'; // Necesario para poder hacer la relación

const Project = sequelize.define('projects', 
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING			
		},
		priority: {
			type: DataTypes.INTEGER
		},
		description: {
			type: DataTypes.TEXT
		}
	}, 
	{
		onUpdate: 'cascade', // Este campo viene por defecto en 'CASCADE' si no se especifica
	    onDelete: 'cascade', // Este campo viene por defecto en 'SET NULL' si no se especifica
		timestamps: true  // Este campo viene por defecto en true si no se especifica
	}
);

// Forma de relacionar una tabla padre con una tabla hijo.
Project.hasMany(Task, {
	foreignKey: 'projectId', // Esto hará que este campo se cree al crearse la tabla con seuelize
	sourceKey: 'id'
});

Task.belongsTo(Project, {
	foreignKey: 'projectId', // Campo de la tabla padre
	targetId: 'id' // id de esta tabla	
});

export default Project;