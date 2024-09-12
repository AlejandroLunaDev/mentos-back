import express from 'express';
import {
  getUsersController,
  getUserByIdController,
  getUserByEmailController,
  addUserController,
  updateUserController,
  deleteUserController,
  addLikeToUserController,
  removeLikeFromUserController // Asegúrate de que el nombre sea correcto
} from '../controllers/users/index.js'; // Asegúrate de que la ruta sea correcta

const router = express.Router();

router.get('/', getUsersController);
router.get('/:id', getUserByIdController);
router.get('/email/:email', getUserByEmailController);
router.post('/', addUserController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);
router.post('/like', addLikeToUserController);
router.post('/like/remove', removeLikeFromUserController);

export default router;
