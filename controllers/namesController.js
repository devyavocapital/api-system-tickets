import { NameModel } from "../models/name.js";

export const getNames = async (req, res) => {
	try {
		const response = await NameModel.getNames();
		return res.json(response);
	} catch (error) {
		console.log(error);
	}
};
