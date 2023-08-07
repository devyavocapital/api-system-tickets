const { fnSequelize } = require("../db/config");

exports.createIssue = async (req, res) => {
	let id;
	const {
		nameClient,
		creditNumber,
		socialNumber,
		cardNumber,
		initialComment,
		assignTo,
		status,
	} = req.body;

	if (req.body.id === undefined) id = "null";
	if (req.body.id !== undefined) id = req.body.id;

	try {
		const sequelize = fnSequelize();
		const issue = await sequelize.query(
			`EXEC SP_ISSUES ${id}, '${nameClient}', '${creditNumber}', '${socialNumber}', '${cardNumber}', '${initialComment}', ${assignTo}, ${
				req.usuario.id
			}, ${status === "" ? "'pendient'" : `'${status}'`}`,
		);
		sequelize.close();
		res.json({ issue });
	} catch (error) {
		console.log(error);
		return res.json({ error: "Hubo un error" });
	}
};

exports.getIssues = async (req, res) => {
	let id;

	if (req.body.id === undefined) id = "null";
	if (req.body.id !== undefined) id = req.body.id;

	try {
		const sequelize = fnSequelize();
		const issue = await sequelize.query(`EXEC SP_LST_ISSUES ${id}`, {
			type: sequelize.QueryTypes.RAW,
		});
		sequelize.close();
		res.json({ issue });
	} catch (error) {
		console.log(error);
		return res.json({ error: "Hubo un error" });
	}
};
