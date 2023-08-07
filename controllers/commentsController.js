const { fnSequelize } = require("../db/config");

exports.createComment = async (req, res) => {
	let id;
	const { description, id_issue } = req.body;

	if (req.body.id === undefined) id = "null";
	if (req.body.id !== undefined) id = req.body.id;

	try {
		const sequelize = fnSequelize();
		const issue = await sequelize.query(
			`EXEC SP_COMMENTS ${id}, '${description}', ${req.usuario.id}, ${id_issue}`,
		);
		sequelize.close();
		res.json({ issue });
	} catch (error) {
		console.log(error);
		return res.json({ error: "Hubo un error" });
	}
};
