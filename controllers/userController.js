import { UserModel } from "../models/user.js";

export const createUser = async (req, res) => {
	const { email, password, category, name, lastname, motherLastname } =
		req.body;
	const response = await UserModel.createUser({
		email,
		password,
		category,
		name,
		lastname,
		motherLastname,
	});

	return res.json(response);
};
