import { StatsModel } from "../models/stats.js";

export const getStats = async (req, res) => {
	const response = await StatsModel.getStats({ userId: req.usuario.id });

	return res.json(response);
};
