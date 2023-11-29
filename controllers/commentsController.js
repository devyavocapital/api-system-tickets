import { CommentModel } from "../models/comment.js";

export const getComments = async (req, res) => {
	const { idIssue } = req.query;

	try {
		const response = await CommentModel.getComments({ idIssue });
		return res.json(response);
	} catch (error) {
		console.log(error);
	}
};

export const createComment = async (req, res) => {
	const { description, idIssue, userAssignated, status, fileName } = req.body;

	const userId = req.usuario.id;

	try {
		const response = await CommentModel.createComment({
			description,
			idIssue,
			userAssignated,
			status,
			fileName,
			userId,
		});

		if (response?.error) {
			if (response.error?.errors) {
				return res.status(400).json(response.error.errors);
			}
			return res.status(400).json(response);
		}

		return res.status(response.status).json(response);
	} catch (error) {
		console.log(error);
	}
};

export const updateComment = async (req, res) => {
	const { description, idIssue, userAssignated, status, fileName } = req.body;
	const { id } = req.query;
	const userId = req.usuario.id;

	try {
		const response = await CommentModel.updateComment({
			id,
			description,
			idIssue,
			userAssignated,
			status,
			fileName,
			userId,
		});

		if (response?.error) {
			if (response.error?.errors) {
				return res.status(400).json(response.error.errors);
			}
			return res.status(400).json(response);
		}

		return res.status(response.status).json(response);
	} catch (error) {
		console.log(error);
	}
};
