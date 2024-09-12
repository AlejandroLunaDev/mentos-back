import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import passportJWT from 'passport-jwt';
import bcrypt from 'bcrypt';
import UserModel from '../dao/models/users.model.js'; // Ajusta la ruta según tu estructura
import config from './config.js'; // Ajusta la ruta según tu estructura

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

// Función para buscar el token en las cookies
const findToken = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[config.PASS_COOKIE]; // Ajusta según el nombre de tu cookie
  }
  return token;
};

// Configuración de Passport
const initializePassport = () => {
  // Estrategia JWT
  passport.use(
    'jwt',
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([findToken]),
        secretOrKey: config.PRIVATE_KEY,
      },
      async (jwtPayload, done) => {
        try {
          return done(null, jwtPayload.user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Estrategia Google OAuth
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.GOOGLE_CALLBACK_URL_PROD,
        scope: ['profile', 'email'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Busca el usuario en la base de datos por el email proporcionado por Google
          let user = await UserModel.findOne({ email: profile._json.email });
          
          // Si el usuario no existe, crea uno nuevo
          if (!user) {
            user = new UserModel({
              first_name: profile._json.given_name,
              last_name: profile._json.family_name,
              email: profile._json.email,
              password: bcrypt.hashSync(profile._json.email, bcrypt.genSaltSync(10)),
              avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : 'https://via.placeholder.com/150',
              role: 'mentee',
              age: 20, 
            });
            await user.save();
          }
          
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initializePassport;
