const { fnSequelize } = require("../db/config");

exports.createCategory = async (req, res) => {
	const { nameCategory } = req.body;

	const id = "null";

	try {
		const sequelize = fnSequelize();
		await sequelize.query(
			`EXEC SP_CATEGORIES_ISSUES ${id}, '${nameCategory}', ${req.usuario.id}`,
		);
		sequelize.close();
		res.json({ msg: "Categoría agregada." });
	} catch (error) {
		console.log(error);
		return res.json({ error: "Hubo un error" });
	}
};

exports.getCategories = async (req, res) => {
	let id;
	if (req.query.id === undefined) id = "null";
	if (req.query.id !== undefined) id = req.query.id;

	try {
		const sequelize = fnSequelize();
		const categories = await sequelize.query(
			`EXEC SP_LST_CATEGORY_ISSUES ${id}`,
		);
		sequelize.close();
		res.json({ categories });
	} catch (error) {
		console.log(error);
		return res.json({ error: "Hubo un error" });
	}
};

exports.updateCategory = async (req, res) => {
	let id;
	const { nameCategory } = req.body;

	if (req.query.id === undefined) id = "null";
	if (req.query.id !== undefined) id = req.query.id;

	try {
		const sequelize = fnSequelize();
		await sequelize.query(
			`EXEC SP_LST_CATEGORY_ISSUES ${id}, '${nameCategory}', ${req.usuario.id}`,
		);
		sequelize.close();
		res.json({ msg: "Categoría actualizada." });
	} catch (error) {
		console.log(error);
		return res.json({ error: "Hubo un error" });
	}
};
