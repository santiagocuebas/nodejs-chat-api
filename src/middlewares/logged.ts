import type { Direction } from '../global.js';
import { verifyToken } from '../libs/verify-token.js';

export const isLoggedIn: Direction = async (req, res, next) => {
	const user = await verifyToken(req.headers.authorization)
		.catch(() => null);

	if (user === null) return res.status(401).json({ error: 'Invalid token' });

	req.user = user.toObject();

	return next();
};

export const isNotLoggedIn: Direction = async (req, res, next) => {
	const user = await verifyToken(req.headers.authorization)
		.catch(() => null);
	
	if (user === null) return next();

	return res.status(401).json({ error: 'Logged' });
};
