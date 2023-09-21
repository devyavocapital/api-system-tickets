const { fnSequelize } = require("../db/config");

exports.getComments = async (req, res) => {
	const { id } = req.query;

	try {
		const sequelize = fnSequelize();
		const comments = await sequelize.query(
			`EXEC SP_LST_COMMENTS ${id === undefined ? "null" : id}`,
		);
		sequelize.close();
		res.json(comments);
	} catch (error) {
		console.log(error);
		return res.json({ error: "Hubo un error" });
	}
};

exports.createComment = async (req, res) => {
	let id;
	const { description, id_issue, userAssignated, status, fileName } = req.body;

	if (req.body.id === undefined) id = "null";
	if (req.body.id !== undefined) id = req.body.id;

	try {
		const sequelize = fnSequelize();
		const issue = await sequelize.query(
			`EXEC SP_COMMENTS ${id}, '${description}', ${
				req.usuario.id
			}, ${id_issue}, ${
				userAssignated === undefined ? 0 : userAssignated
			}, '${status}', '${fileName}'`,
		);
		sequelize.close();
		res.json({ msg: "Comentario creado correctamente" });
	} catch (error) {
		console.log(error);
		return res.json({ error: "Hubo un error" });
	}
};
