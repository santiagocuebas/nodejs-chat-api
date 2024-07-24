import { body, ValidationChain } from 'express-validator';
import { User } from '../models/index.js';
import { matchPassword } from './index.js';

export const arrayRegister: ValidationChain[] = [
	body('email', 'Invalid email')
		.exists({ values: 'falsy' }).bail()
		.isEmail().bail()
		.isLength({ max: 60 }).withMessage('The email is too long'),
	body('password')
		.exists({ values: 'falsy' })
		.isString().bail()
		.isLength({ min: 8, max: 60 }).withMessage('The password is too short or too long').bail()
		.matches(/[0-9]/).withMessage('Password must constain a number').bail()
		.custom(async (value, { req }) => {
			const user = await User.findOne({ email: req.body.email });
		
			if (user !== null) {
				const match = await matchPassword(value, user.password);
				
				if (!match) throw new Error('Incorrect password');
			}
		
			return true;
		})
];
