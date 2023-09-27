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
	});
	return res.json(response);
};

export const getIssues = async (req, res) => {
	const { id, nameClient } = req.query;
	const response = await IssuesModel.getIssues({ id, nameClient });
	res.json(response);
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
	return res.json(response);
};
