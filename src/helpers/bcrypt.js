import bcrypt from 'bcryptjs';
import User from '../models/User.js'; // Para poder buscar la contraseña del usuario por su email

const hashing = {};

hashing.encryptPassword = async password => { // Devuelve un has a partir de un string
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

hashing.matchPassword = async (email, password) => {
	try {
		const user = await User.findOne({
			where: { email },
			attributes: ['id', 'password'] // attributes es un campo reservado. Mediante un array se le indica a la consulta que solo devuelva los campos especificados en el array
		});
		return await { id: user.id, match: bcrypt.compare(password, user.password) };
	} catch(e) {
		console.log(e.message);
	}	
};

export default hashing;