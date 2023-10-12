import jwt from "jsonwebtoken";
import { Login } from "../models/login.js";

export const authUser = async (req, res) => {
	const { email, password } = req.body;

	// const payload =
	const payload = await Login.getLogin({ email, password });

	if (payload?.error) {
		return res.json(payload);
	}

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
	const response = await Login.getUserAuthenticated({ id: req.usuario.id });
	return res.json(response);
};
