const { fnSequelize } = require("../db/config");

exports.getNames = async (req, res) => {
	try {
		const sequelize = fnSequelize();
		const names = await sequelize.query("EXEC SP_LST_NAMES");
		sequelize.close();
		res.json({ names });
	} catch (error) {
		console.log(error);
		return res.json({ error: "Hubo un error" });
	}
};
