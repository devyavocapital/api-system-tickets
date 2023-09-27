import { NameModel } from "../models/name.js";

export const getNames = async (req, res) => {
	const response = await NameModel.getNames();
	return res.json(response);
};
