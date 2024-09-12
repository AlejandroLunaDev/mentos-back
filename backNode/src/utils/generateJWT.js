// utils/generateJWT.js

import jwt from 'jsonwebtoken';
import config from '../config/config.js'; 

const generateJWT = (user) => {
  return jwt.sign(user, config.PRIVATE_KEY, { expiresIn: '1h' });
};

export default generateJWT;
