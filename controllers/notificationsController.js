const { fnSequelize } = require("../db/config");

exports.createNotification = async (req, res) => {
	const { nameClient, userAssignated } = req.body;

	const id = "null";

	// [dbo].[SP_NOTIFICATIONS] (@ID_NOTIFICATION INT, @CLIENT VARCHAR(MAX), @USER_CREATED INT, @USER_ASSIGNATED INT, @READED BIT, @ACTIVE BIT)
	try {
		const sequelize = fnSequelize();
		await sequelize.query(
			`EXEC SP_NOTIFICATIONS ${id}, '${nameClient}', ${req.usuario.id}, ${userAssignated}, 0, 1, NULL`,
		);
		sequelize.close();
		res.json({ msg: "Notificación agregada." });
	} catch (error) {
		console.log(error);
		return res.json({ error: "Hubo un error" });
	}
};

exports.updateDataNotification = async (req, res) => {
	const { originalClient, userAssignated, newNameClient } = req.body;
	const id = "null";

	// [dbo].[SP_NOTIFICATIONS] (@ID_NOTIFICATION INT, @CLIENT VARCHAR(MAX), @USER_CREATED INT, @USER_ASSIGNATED INT, @READED BIT, @ACTIVE BIT)
	try {
		const sequelize = fnSequelize();
		await sequelize.query(
			`EXEC SP_NOTIFICATIONS ${id}, '${originalClient}', ${req.usuario.id}, ${userAssignated}, 0, 1, '${newNameClient}'`,
		);
		sequelize.close();
		res.json({ msg: "Notificación Actualizada." });
	} catch (error) {
		console.log(error);
		return res.json({ error: "Hubo un error" });
	}
};

exports.getNotifications = async (req, res) => {
	try {
		const sequelize = fnSequelize();
		const notifications = await sequelize.query(
			`EXEC SP_LST_NOTIFICATIONS ${req.usuario.id}`,
		);
		sequelize.close();
		res.json({ notifications });
	} catch (error) {
		console.log(error);
		return res.json({ error: "Hubo un error" });
	}
};

exports.updateNotification = async (req, res) => {
	const { id, readed, active } = req.body;
	// [dbo].[SP_NOTIFICATIONS] (@ID_NOTIFICATION INT, @CLIENT VARCHAR(MAX), @USER_CREATED INT, @USER_ASSIGNATED INT, @READED BIT, @ACTIVE BIT)
	try {
		const sequelize = fnSequelize();
		await sequelize.query(
			`EXEC SP_NOTIFICATIONS ${id}, '', '', '', ${readed}, ${active}, NULL`,
		);
		sequelize.close();
		res.json({ msg: "Notificación actualizada." });
	} catch (error) {
		console.log(error);
		return res.json({ error: "Hubo un error" });
	}
};
