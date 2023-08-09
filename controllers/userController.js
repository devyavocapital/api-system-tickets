const bcrypt = require("bcrypt");
const { fnSequelize } = require("../db/config");

exports.createUser = async (req, res) => {
	const { email, password, category, nombre, ap_paterno, ap_materno } =
		req.body;

	if (email === "" || email === undefined) {
		return res.json({ error: "El campo email es obligatorio" });
	}

	if (password === "" || password === undefined) {
		return res.json({ error: "El campo password es obligatorio" });
	}

	try {
		const sequelize = fnSequelize();
		// hashear password
		const salt = await bcrypt.genSalt(10);
		const newPass = await bcrypt.hash(password, salt);

		await sequelize.query(
			`EXEC SP_NEW_USER '${email}', '${newPass}', ${category}, ${nombre}, ${ap_paterno}, ${ap_materno}`,
		);
		sequelize.close();

		res.json({ msg: "Usuario creado correctamente" });
	} catch (error) {
		console.log(error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}

	// const payload = {
	// 	user: {
	// 		id: user.id,
	// 		email: user.email,
	// 		name: user.name,
	// 	},
	// };

	// jwt.sign(
	// 	payload,
	// 	process.env.JAVOSECRETWORDS,
	// 	{
	// 		expiresIn: "30D",
	// 	},
	// 	({ error }) => {
	// 		if (error) throw error;

	// 		res.json({ msg: "Usuario creado correctamente" });
	// 	},
	// );
};
