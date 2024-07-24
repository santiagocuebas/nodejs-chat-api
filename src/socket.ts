import type { Socket } from 'socket.io';
import { Chat } from './models/Chat.js';

export default async (socket: Socket) => {
	const chats = await Chat
		.find()
		.sort({ createdAt: -1 })
		.limit(10);
	
	socket.emit('loadChats', chats);

	socket.on('loadChats', async (skip: number) => {
		const chats = await Chat
			.find()
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(10);
	
		socket.emit('loadChats', chats);
	});

	socket.on('addChat', async (message: string) => {
		const newMessage = await Chat.create({
			body: message,
			from: socket.user.id,
			username: socket.user.username,
			createdAt: new Date
		});

		socket.emit('addChat', newMessage, true);
		socket.broadcast.emit('addChat', newMessage);
	});

	socket.on('deleteChat', async (_id: string) => {
		await Chat.deleteOne({ _id, from: socket.user.id });

		socket.broadcast.emit('deleteChat', _id);
	});
};
