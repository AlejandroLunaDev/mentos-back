import express from 'express';
import passport from 'passport';
import passportCall from '../utils/passportCall.js'; // Importa passportCall
import {
  loginController,
  logoutController,
  registerController,
  googleLoginController,
  callBackGoogleController
} from '../controllers/sessions.controller.js';

const router = express.Router();

// Ruta para iniciar sesión con credenciales (usuario y contraseña)
router.post('/login', loginController);

// Ruta para cerrar sesión
router.post('/logout', logoutController);

// Ruta para registrarse (si es necesario)
router.post('/register', registerController);

// Ruta para redirigir al usuario a Google para autenticación
router.get('/google', googleLoginController);

// Ruta de callback para Google después de la autenticación
router.get('/google/callback', passportCall('google'), callBackGoogleController);

export default router;
