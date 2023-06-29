import User from '../models/User.js';
import hashing from '../helpers/bcrypt.js';
import { generateToken } from '../helpers/jwt.js';

export const login = async (_req, res) => {
	const { email, password } = _req.body;
	const match = await hashing.matchPassword(email, password);
	if (match.match) {
		const token = generateToken(match.id);
		res.status(201).json({ token });
	} else
		res.status(401).json({ message: 'Invalid credentials' });
};

export const store = async (_req, res) => {
	const { email, password, confirm } = _req.body;	
	if (password !== confirm) {
		res.status(401).json({ message: 'passwords does not match'});
		return;
	}
	try {
		const passwordHash = await hashing.encryptPassword(password);
		const newUser = await User.create({
			email,
			password: passwordHash
		});
		res.sendStatus(201);
	} catch(e) {
		res.status(500).json({ message: e.message });
	}	
};