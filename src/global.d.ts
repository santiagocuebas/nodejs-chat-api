import { Request, Response, NextFunction } from 'express';
import { Session } from 'express-session';
import { Types } from 'mongoose';

declare module 'http' {
	interface IncomingMessage {
		user: IUser
	}
}

declare module 'socket.io' {
	interface Socket {
		user: IUser;
	}
}

export type Direction = (req: Request, res: Response, next: NextFunction) => void;

export interface IKeys<T> {
	[index: string]: T;
}

export interface IChat {
	_id: Types.ObjectId;
	from: string;
	username: string;
	body: string;
	createdAt: Date;
}

export interface IUser {
	_id: Types.ObjectId;
	id: string;
	email: string;
	username: string;
	password: string;
	createdAt: Date;
}
