import { fnSequelize } from "../db/config.js";

export class CommentModel {
	static async getComments({ id = null }) {
		try {
			const sequelize = fnSequelize();
			const comments = await sequelize.query(`EXEC SP_LST_COMMENTS ${id}`);
			sequelize.close();
			return comments;
		} catch (error) {
			console.log(error);
			return { error: "Hubo un error" };
		}
	}

	static async createComment({
		id = "null",
		description,
		id_issue,
		userAssignated = 0,
		status,
		fileName,
		userId,
	}) {
		try {
			const sequelize = fnSequelize();
			await sequelize.query(
				`EXEC SP_COMMENTS ${id}, '${description}', ${userId}, ${id_issue}, ${userAssignated}, '${status}', '${fileName}'`,
			);
			sequelize.close();
			return { msg: "Comentario creado correctamente" };
		} catch (error) {
			console.log(error);
			return { error: "Hubo un error" };
		}
	}
}
