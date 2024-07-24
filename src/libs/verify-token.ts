import jwt from 'jsonwebtoken';
import { SECRET } from '../config.js';
import { User } from '../models/index.js';

export const verifyToken = async (token = '') => {
  const decoded = jwt.verify(token, SECRET) as jwt.JwtPayload;
  return User.findOne({ _id: decoded.id });
};
