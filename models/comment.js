import mongoose from "mongoose";
import { urlApi } from "../db/config.js";
import comments from "../schemas/comment.js";

export class CommentModel {
	static async getComments({ idIssue = null }) {
		try {
			await mongoose.connect(urlApi);

			if (idIssue !== null) {
				const commentsList = await comments.find({ idIssue });
				await mongoose.disconnect();
				return commentsList;
			}

			const commentsList = await comments.find();
			await mongoose.disconnect();

			return commentsList;
		} catch (error) {
			console.log(error);
			return { error: "Hubo un error" };
		}
	}

	static async createComment({
		description,
		idIssue,
		userAssignated,
		status,
		fileName,
		userId,
	}) {
		try {
			await mongoose.connect(urlApi);

			const newComment = comments({
				description,
				userId,
				idIssue,
				userAssignated,
				status,
				fileName,
			});

			await newComment.save();
			await mongoose.disconnect();

			return { msg: "Comentario creado correctamente", status: 201 };
		} catch (error) {
			console.log({ errorMongo: error });
			return { error };
		}
	}

	static async updateComment({
		id,
		description,
		idIssue,
		userAssignated,
		status,
		fileName,
		userId,
	}) {
		try {
			await mongoose.connect(urlApi);

			const commentExist = await comments.findById(id);

			if (!commentExist) {
				return {
					error: "Error: No existe comentario con este ID.",
					status: 401,
				};
			}

			await comments.findByIdAndUpdate(id, {
				description,
				userId,
				idIssue,
				userAssignated,
				status,
				fileName,
			});

			await mongoose.disconnect();

			return { msg: "Comentario actualizado correctamente", status: 200 };
		} catch (error) {
			console.log({ errorMongo: error });
			return { error };
		}
	}
}
