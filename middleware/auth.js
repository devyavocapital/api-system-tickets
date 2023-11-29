import jwt from "jsonwebtoken";

// module.exports = function (req, res, next) {
export const auth = (req, res, next) => {
	const bearer = req.header("Authorization");
	if (!bearer) {
		return res.status(500).json({ msg: "El token no es válido" });
	}
	const token = bearer.split(" ")[1];

	// revisar si existe el token
	if (!token) {
		return res.status(500).json({ msg: "El token no es válido" });
	}

	try {
		const cifrado = jwt.verify(token, process.env.SECRETTRACKSWORDS);
		req.usuario = cifrado.usuario;
		next();
	} catch (error) {
		res.status(500).json({ msg: "El token no es válido" });
	}
};
