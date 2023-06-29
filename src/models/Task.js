import { DataTypes } from 'sequelize'; // Trae los tipos de datos que maneja el ORM Sequelize
import { sequelize } from '../database/database.js'; // Traemos la conección establecida

const Task = sequelize.define('tasks', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: DataTypes.STRING			
	},
	done: {
		type: DataTypes.BOOLEAN,
		defaulValue: false
	}
}, {
	timestamps: true  // Este campo viene por defecto en true si no se especifica
});

export default Task;