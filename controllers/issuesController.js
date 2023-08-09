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
		category,
	} = req.body;

	if (req.body.id === undefined) id = "null";
	if (req.body.id !== undefined) id = req.body.id;

	try {
		const sequelize = fnSequelize();
		const issue = await sequelize.query(
			`EXEC SP_ISSUES ${id}, '${nameClient}', '${creditNumber}', '${socialNumber}', '${cardNumber}', ${
				initialComment === undefined ? "''" : `'${initialComment}'`
			}, ${assignTo === undefined ? 0 : assignTo}, ${req.usuario.id}, ${
				status === undefined ? "'pendient'" : `'${status}'`
			}, ${category === undefined ? 0 : category}`,
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
			type: sequelize.QueryTypes.SELECT,
		});
		const comments = await sequelize.query(`EXEC SP_LST_COMMENTS ${id}`, {
			type: sequelize.QueryTypes.RAW,
		});
		sequelize.close();
		res.json({ issue, comments });
	} catch (error) {
		console.log(error);
		return res.json({ error: "Hubo un error" });
	}
};
