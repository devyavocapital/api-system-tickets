import { fnSequelize } from "../db/config.js";

export class StatsModel {
	static async getStats({ userId }) {
		try {
			const sequelize = fnSequelize();
			const stats = await sequelize.query("EXEC SP_LST_STATS 1, NULL");
			const statsByUser = await sequelize.query("EXEC SP_LST_STATS 2, NULL");
			const statsCreated = await sequelize.query(
				`EXEC SP_LST_STATS 3, ${userId}`,
			);
			const statsAssignated = await sequelize.query(
				`EXEC SP_LST_STATS 4, ${userId}`,
			);
			sequelize.close();
			return { stats, statsByUser, statsCreated, statsAssignated };
		} catch (error) {
			console.log(error);
			return { error: "Hubo un error" };
		}
	}
}
