import jwt from 'Jsonwebtoken';
import dotenv from 'dotenv'; // Para manejar variables de entorno
dotenv.config();

const { JWT_SECRET_JWT } = process.env; // Desde el archivo .env

export const generateToken = id => {
	const token = jwt.sign({ id }, JWT_SECRET_JWT, {
		expiresIn: 50,
		issuer: 'http://localhost:3000/api/user/login'
	});
	return token;
};

export const verifyToken = token => {
	try {
		jwt.verify(token, JWT_SECRET_JWT);
	} catch(e) {
		if (e.message === 'jwt expired')
			return 1;
		else if (e.message === 'invalid signature')
			return 2;
	}	
};