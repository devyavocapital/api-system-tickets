import jwt from "jsonwebtoken";
import { login } from "../models/login.js";

export const authUser = async (req, res) => {
	const { email, password } = req.body;

	const payload = await login.getLogin({ email, password });

	jwt.sign(
		payload,
		process.env.JAVOSECRETWORDS,
		{
			expiresIn: "30D",
		},
		(error, token) => {
			if (error) throw error;
			return res.json({ token });
		},
	);
};

export const userAuthenticate = async (req, res) => {
	const response = await login.getUserAuthenticated({ id: req.usuario.id });
	return res.json(response);
};
