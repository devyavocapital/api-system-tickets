import { CategoryModel } from "../models/category.js";

export const createCategory = async (req, res) => {
	const { nameCategory } = req.body;

	const id = "null";

	const response = await CategoryModel.createCategory({
		id,
		nameCategory,
		userId: req.usuario.id,
	});

	return res.json(response);
};

export const getCategories = async (req, res) => {
	const { id } = req.query;

	const response = await CategoryModel.getCategories({ id });
	return res.json(response);
};

export const updateCategory = async (req, res) => {
	const { nameCategory } = req.body;
	const { id } = req.query;

	const response = await CategoryModel.updateCategory({
		id,
		nameCategory,
		userId: req.usuario.id,
	});
	return res.json(response);
};
