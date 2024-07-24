import { ValidationError } from 'express-validator';
import { IKeys } from '../global.js';

export const getErrorMessages = (errs: ValidationError[]) => {
	const message: IKeys<string> = {};

	for (const e of errs) {
		if (e.type === 'field') message[e.path] = e.msg;
	}

	return message;
};