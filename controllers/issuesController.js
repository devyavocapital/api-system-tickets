import { IssuesModel } from "../models/issues.js";

export const createIssue = async (req, res) => {
	const {
		id,
		nameClient,
		lastnameClient,
		motherLastnameClient,
		creditNumber,
		socialNumber,
		cardNumber,
		initialComment,
		assignTo,
		status,
		category,
		daysConfig,
	} = req.body;

	const userId = req.usuario.id;

	try {
		const response = await IssuesModel.createIssue({
			id,
			nameClient,
			lastnameClient,
			motherLastnameClient,
			creditNumber,
			socialNumber,
			cardNumber,
			initialComment,
			assignTo,
			status,
			category,
			daysConfig,
			userId,
		});

		if (response?.error) {
			if (response.error?.errors) {
				return res.status(400).json(response.error.errors);
			}
			return res.status(400).json(response);
		}

		return res.json(response);
	} catch (error) {
		console.log(error);
	}
};

export const getIssues = async (req, res) => {
	const { id, nameClient } = req.query;
	try {
		const response = await IssuesModel.getIssues({ id, nameClient });
		res.json(response);
	} catch (error) {
		console.log(error);
	}
};

export const updateIssue = async (req, res) => {
	const {
		nameClient,
		lastnameClient,
		motherLastnameClient,
		creditNumber,
		socialNumber,
		cardNumber,
		assignTo,
		status,
		category,
		daysConfig,
	} = req.body;

	const { id } = req.query;

	try {
		const response = await IssuesModel.updateIssue({
			id,
			nameClient,
			lastnameClient,
			motherLastnameClient,
			creditNumber,
			socialNumber,
			cardNumber,
			assignTo,
			status,
			category,
			daysConfig,
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
