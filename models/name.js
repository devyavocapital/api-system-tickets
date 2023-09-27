import { fnSequelize } from "../db/config.js";

export class NameModel {
	static async getNames() {
		try {
			const sequelize = fnSequelize();
			const names = await sequelize.query("EXEC SP_LST_NAMES");
			sequelize.close();
			return names;
		} catch (error) {
			console.log(error);
			return { error: "Hubo un error" };
		}
	}
}
