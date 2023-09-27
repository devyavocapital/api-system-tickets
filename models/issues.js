import { fnSequelize } from "../db/config.js";

export class IssuesModel {
	static async getIssues({ id = "null", nameClient }) {
		try {
			const sequelize = fnSequelize();
			const issue = await sequelize.query(
				`EXEC SP_LST_ISSUES 
                    ${id}, 
                    ${nameClient}`,
			);
			sequelize.close();
			return issue;
		} catch (error) {
			console.log(error);
			return { error: "Hubo un error" };
		}
	}

	static async createIssue({
		id = "null",
		nameClient,
		lastnameClient = "null",
		motherLastnameClient = "null",
		creditNumber,
		socialNumber,
		cardNumber,
		initialComment = "''",
		assignTo = 0,
		status = "pendient",
		category = 0,
		daysConfig,
	}) {
		try {
			const sequelize = fnSequelize();
			await sequelize.query(
				`EXEC SP_ISSUES 
					${id}, '${nameClient}', 
					'${lastnameClient}', 
					'${motherLastnameClient}', 
					'${creditNumber}', '${socialNumber}', '${cardNumber}', 
					'${initialComment}', 
					${assignTo}, ${req.usuario.id}, 
					'${status}', 
					${category},
					${daysConfig}
					`,
			);
			sequelize.close();
			return { msg: "Incidencia creada correctamente" };
		} catch (error) {
			console.log(error);
			return { error: "Hubo un error" };
		}
	}

	static async updateIssue({
		id,
		nameClient,
		lastnameClient = "null",
		motherLastnameClient = "null",
		creditNumber,
		socialNumber,
		cardNumber,
		assignTo = 0,
		status = "pendient",
		category = 0,
		daysConfig,
	}) {
		try {
			const sequelize = fnSequelize();
			await sequelize.query(
				`EXEC SP_ISSUES 
					${id}, '${nameClient}', 
					'${lastnameClient}', 
					'${motherLastnameClient}', 
					'${creditNumber}', '${socialNumber}', '${cardNumber}', 
					'',
					${assignTo}, ${req.usuario.id}, 
					'${status}', 
					${category},
					${daysConfig}
					`,
			);
			sequelize.close();
			return { msg: "Incidencia actualizada correctamente" };
		} catch (error) {
			console.log(error);
			return { error: "Hubo un error" };
		}
	}
}
