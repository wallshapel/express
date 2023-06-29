import { Router } from 'express';
import { index, show, store, update, destroy, getTasksByProjectId } from '../controllers/ProjectController.js';
import { ensureToken } from '../app.js';

const router = Router();

router.get('/api/projects', index);
router.get('/api/project/show/:id', show);
router.post('/api/project/store', ensureToken, store); // Rutas protegidas por el middleware ensureToken
router.put('/api/project/update/:id', ensureToken, update); // Rutas protegidas por el middleware ensureToken
router.delete('/api/project/destroy/:id', ensureToken, destroy); // Rutas protegidas por el middleware ensureToken

router.get('/api/project/:id/tasks', getTasksByProjectId);

export default router;