import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import multer from 'multer';
import http from 'http';
import { ORIGIN } from './config.js';
import indexRoute from './routes/index.js';

// Initializations
const app = express();
const server = http.createServer(app);

// Middlewares
app.use(morgan('dev'));
app.use(cors({
	origin: ORIGIN,
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Origin', 'Authorization', 'X-Requested-With', 'Content-Type', 'Accept']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer().none());

// Routes
app.use('/api', indexRoute);

export default server;
