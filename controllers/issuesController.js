const { fnSequelize } = require("../db/config");

exports.createIssue = async (req, res) => {
	const {
		id,
		nameClient,
		lastnameClient,
		motherLastnameClient,
		creditNumber,
		socialNumber,
		cardNumber,
		initialComment,
		assignTo,
		status,
		category,
		daysConfig,
	} = req.body;

	try {
		const sequelize = fnSequelize();
		await sequelize.query(
			`EXEC SP_ISSUES 
				${id === undefined ? "null" : id}, '${nameClient}', 
				'${lastnameClient === undefined ? "null" : lastnameClient}', 
				'${motherLastnameClient === undefined ? "null" : motherLastnameClient}', 
				'${creditNumber}', '${socialNumber}', '${cardNumber}', 
				${initialComment === undefined ? "''" : `'${initialComment}'`}, 
				${assignTo === undefined ? 0 : assignTo}, ${req.usuario.id}, 
				${status === undefined ? "'pendient'" : `'${status}'`}, 
				${category === undefined ? 0 : category},
				${daysConfig}
				`,
		);
		sequelize.close();
		res.json({ msg: "Incidencia creada correctamente" });
	} catch (error) {
		console.log(error);
		return res.json({ error: "Hubo un error" });
	}
};

exports.getIssues = async (req, res) => {
	const { id, nameClient } = req.query;
	try {
		const sequelize = fnSequelize();
		const issue = await sequelize.query(
			`EXEC SP_LST_ISSUES 
				${id === undefined ? "null" : id}, 
				${nameClient}`,
		);
		// const comments = await sequelize.query(
		// 	`EXEC SP_LST_COMMENTS ${id === undefined ? "null" : id}`,
		// 	{
		// 		type: sequelize.QueryTypes.RAW,
		// 	},
		// );
		sequelize.close();
		res.json({ issue });
	} catch (error) {
		console.log(error);
		return res.json({ error: "Hubo un error" });
	}
};

exports.updateIssue = async (req, res) => {
	const {
		nameClient,
		lastnameClient,
		motherLastnameClient,
		creditNumber,
		socialNumber,
		cardNumber,
		assignTo,
		status,
		category,
		daysConfig,
	} = req.body;

	const { id } = req.query;

	try {
		const sequelize = fnSequelize();
		const issue = await sequelize.query(
			`EXEC SP_ISSUES 
				${id}, '${nameClient}', 
				'${lastnameClient === undefined ? "null" : lastnameClient}', 
				'${motherLastnameClient === undefined ? "null" : motherLastnameClient}', 
				'${creditNumber}', '${socialNumber}', '${cardNumber}', 
				'',
				${assignTo === undefined ? 0 : assignTo}, ${req.usuario.id}, 
				${status === undefined ? "'pendient'" : `'${status}'`}, 
				${category === undefined ? 0 : category},
				${daysConfig}
				`,
		);
		sequelize.close();
		res.json({ msg: "Incidencia actualizada correctamente" });
	} catch (error) {
		console.log(error);
		return res.json({ error: "Hubo un error" });
	}
};
