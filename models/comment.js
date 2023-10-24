import { fnSequelize } from "../db/config.js";
import { commentSchema } from "../schemas/comment.js";

export class CommentModel {
	static async getComments({ id = null }) {
		try {
			const sequelize = fnSequelize();
			const comments = await sequelize.query("EXEC SP_LST_COMMENTS :id", {
				replacements: { id },
			});
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
			await commentSchema.parseAsync({
				id,
				description,
				id_issue,
				userAssignated,
				status,
				fileName,
				userId: parseInt(userId),
			});

			const sequelize = fnSequelize();
			await sequelize.query(
				"EXEC SP_COMMENTS :id, :description, :userId, :id_issue, :userAssignated, :status, :fileName",
				{
					replacements: {
						id,
						description,
						userId,
						id_issue,
						userAssignated,
						status,
						fileName,
					},
				},
			);
			sequelize.close();
			return { msg: "Comentario creado correctamente" };
		} catch (error) {
			if (error.errors) {
				return { zodError: error?.errors };
			}
			return { error: "Hubo un error" };
		}
	}
}
