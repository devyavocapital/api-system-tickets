import { CommentModel } from "../models/comment.js";

export const getComments = async (req, res) => {
	const { id } = req.query;

	const response = await CommentModel.getComments({ id });
	return res.json(response);
};

export const createComment = async (req, res) => {
	const { id, description, id_issue, userAssignated, status, fileName } =
		req.body;

	const response = await CommentModel.createComment({
		id,
		description,
		id_issue,
		userAssignated,
		status,
		fileName,
		userId: req.usuario.id,
	});

	return res.json(response);
};
