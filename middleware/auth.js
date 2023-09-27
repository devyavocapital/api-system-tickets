// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";

// module.exports = function (req, res, next) {
export const auth = (req, res, next) => {
	const token = req.header("x-auth-token");

	// revisar si existe el token
	if (!token) {
		return res.json({ msg: "El token no es válido" });
	}

	try {
		const cifrado = jwt.verify(token, process.env.JAVOSECRETWORDS);
		req.usuario = cifrado.usuario;
		next();
	} catch (error) {
		res.json({ msg: "El token no es válido" });
	}
};
