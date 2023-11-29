import mongoose from "mongoose";
import { urlApi } from "../db/config.js";
import comments from "../schemas/comment.js";
import issues from "../schemas/issue.js";

export class CommentModel {
	static async getComments({ idIssue = null }) {
		try {
			await mongoose.connect(urlApi);

			if (idIssue !== null) {
				const commentsList = await comments.aggregate([
					{
						$match: {
							idIssue: new mongoose.Types.ObjectId(idIssue),
						},
					},
					{
						$lookup: {
							from: "modelusers",
							localField: "userId",
							foreignField: "_id",
							as: "user",
						},
					},
					{
						$unset: ["userId", "idIssue"],
					},
					{
						$project: {
							_id: 1,
							description: 1,
							status: 1,
							created_At: 1,
							fileName: 1,
							"user.email": 1,
							"user.name": 1,
							"user.lastname": 1,
						},
					},
					{
						$sort: {
							created_At: -1,
						},
					},
				]);
				await mongoose.disconnect();
				return commentsList;
			}

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
		assignTo,
		status,
		fileName = null,
		userId,
	}) {
		try {
			await mongoose.connect(urlApi);

			const newComment = comments({
				description,
				userId,
				idIssue,
				assignTo,
				status,
				fileName,
			});

			const updated = await issues.findByIdAndUpdate(
				{ _id: idIssue },
				{ status, assignTo },
			);
			console.log(updated);

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
		assignTo,
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
				assignTo,
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
