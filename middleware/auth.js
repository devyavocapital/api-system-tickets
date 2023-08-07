const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
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
