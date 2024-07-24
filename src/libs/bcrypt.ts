import bcrypt from 'bcrypt';

export const encryptPassword = async (pass: string): Promise<string> => {
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(pass, salt);
	return hash;
};

export const matchPassword = async (pass: string, savedPass: string) => {
	return bcrypt.compare(pass, savedPass);
};
