const { fnSequelize } = require("../db/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.authUser = async (req, res) => {
	const { email, password } = req.body;

	if (email === "" || email === undefined) {
		return res.json({ error: "Error: El campo email es obligatorio" });
	}

	if (password === "" || password === undefined) {
		return res.json({ error: "Error: El campo password es obligatorio" });
	}

	try {
		const sequelize = fnSequelize();
		const response = await sequelize.query(`EXEC SP_LOGIN NULL, '${email}'`);
		sequelize.close();

		const user = response[0];
		//Comparar los passwords
		const passwordCorrect = await bcrypt.compare(password, user[0].password);
		if (!passwordCorrect) {
			return res.json({ error: "Error: El password es incorrecto" });
		}
		//firmar jwt
		const payload = {
			usuario: {
				id: user[0].id,
			},
		};

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
	} catch (error) {
		// console.error();
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};

exports.userAuthenticate = async (req, res) => {
	try {
		const sequelize = fnSequelize();
		const usuario = await sequelize.query(
			`EXEC SP_LOGIN ${req.usuario.id}, NULL`,
		);
		sequelize.close();
		res.json({ usuario });
	} catch (error) {
		console.log(error);
		return res.json({ error: "Hubo un error" });
	}
};
