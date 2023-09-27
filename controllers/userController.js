import { UserModel } from "../models/user.js";

export const createUser = async (req, res) => {
	const { email, password, category, nombre, ap_paterno, ap_materno } =
		req.body;

	const response = await UserModel.createUser({
		email,
		password,
		category,
		nombre,
		ap_paterno,
		ap_materno,
	});

	return res.json(response);
};
