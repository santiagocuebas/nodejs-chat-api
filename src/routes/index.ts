import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config.js';
import { arrayRegister, encryptPassword } from '../libs/index.js';
import { isLoggedIn, isNotLoggedIn } from '../middlewares/logged.js';
import { validate } from '../middlewares/validator.js';
import { User } from '../models/index.js';

const router = Router();

router.get(
	'/main',
	isLoggedIn,
	(req, res) => {
		return res.json({ id: req.user.id, token: req.headers.authorization });
	}
);

router.post(
	'/register',
	isNotLoggedIn,
	validate(arrayRegister),
	async (req, res) => {
		try {
			let user = await User.findOne({ email: req.body.email });
	
			if (user === null) user = await User.create({
				email: req.body.email,
				username: req.body.email.split('@')[0],
				password: await encryptPassword(req.body.password)
			});
	
			const token = jwt.sign({
				id: user.id,
				exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 15
			}, SECRET);
	
			return res.json({ token });
		} catch {
			return res.status(401).json({
				error: 'An error occurred while trying to register the user'
			});
		}
	}
);

export default router;
