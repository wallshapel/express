import { Router } from 'express';
import { index, show, store, destroy, update } from '../controllers/TaskController.js';

const router = Router();

router.get('/api/tasks', index);
router.get('/api/task/show/:id', show);
router.post('/api/task/store', store);
router.put('/api/task/update/:id', update);
router.delete('/api/task/destroy/:id', destroy);

export default router;