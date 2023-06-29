import { DataTypes } from 'sequelize'; // Trae los tipos de datos que maneja el ORM Sequelize
import { sequelize } from '../database/database.js'; // Traemos la conección establecida

const User = sequelize.define('users', 
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		email: {
			type: DataTypes.STRING,
			unique: true
		},
		password: {
			type: DataTypes.TEXT // Debe ser text si se usa cifrado el cual puede causar un desbordamiento y cortar el hash
		}
	}, 
	{
		schema: 'public', // Este campo viene por defecto en public. Solo para PostgreSQL
		onUpdate: 'cascade', // Este campo viene por defecto en 'CASCADE' si no se especifica
		onDelete: 'cascade', // Este campo viene por defecto en 'SET NULL' si no se especifica
		timestamps: true,  // Este campo viene por defecto en true si no se especifica
		charset: 'utf8', // Este campo viene po defecto en 'null' si no se especifica
  		collate: 'utf8_general_ci'
	}
);

export default User;