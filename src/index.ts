import { Server } from 'socket.io';
import mongoose from 'mongoose';
import server from './app.js';
import { PORT, MONGO_URI, ORIGIN } from './config.js';
import initSocket from './socket.js';
import { verifyToken } from './libs/index.js';

// Connect Database
await mongoose
	.connect(MONGO_URI)
	.then(() => console.log('MongoDB Database is Connected'))
	.catch(err => console.error('An error has occurred with', err));

// Create Server
const io = new Server(server, {
	cors: {
		origin: ORIGIN,
		methods: ['GET', 'POST']
	}
});

io.use(async (socket, next) => {
	const { sessionID, token } = socket.handshake.auth;

	const user = await verifyToken(token)
		.catch(() => null);

	if (user === null || user.id !== sessionID) return (new Error('Unauthorized'));

	socket.user = user.toObject();
	
	return next();
});

io.on('connection', initSocket);

// Listener Server
server.listen(PORT, () => console.log('Server running in port', PORT));
