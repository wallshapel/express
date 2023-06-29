import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
	'express-projects', // Nombre de la DB
	'postgres', // Usuario de la DB
	'123', // Contraseña de la DB
	{
		host: '127.0.0.1',
		dialect: 'postgres'
	}
);