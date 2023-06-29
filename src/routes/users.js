import { Router } from 'express';
import { login, store } from '../controllers/UserController.js';

const router = Router();

router.get('/api/user/login', login);
router.post('/api/user/store', store);


export default router;