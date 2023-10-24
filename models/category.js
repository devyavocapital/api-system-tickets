import { fnSequelize } from "../db/config.js";
import { categorySchema } from "../schemas/category.js";

export class CategoryModel {
	static async getCategories({ id = "null" }) {
		try {
			const sequelize = fnSequelize();
			const categories = await sequelize.query(
				"EXEC SP_LST_CATEGORY_ISSUES :id",
				{
					replacements: { id },
				},
			);
			sequelize.close();
			return categories;
		} catch (error) {
			console.log(error);
			return { error: "Hubo un error" };
		}
	}

	static async createCategory({ id = "null", nameCategory, userId }) {
		try {
			const result = await categorySchema.parseAsync({
				id,
				nameCategory,
				userId: parseInt(userId),
			});

			const sequelize = fnSequelize();
			await sequelize.query(
				"EXEC SP_CATEGORIES_ISSUES :id, :nameCategory, :userId",
				{
					replacements: {
						id: result.id,
						nameCategory: result.nameCategory,
						userId: result.userId,
					},
				},
			);
			sequelize.close();
			return { msg: "Categoría agregada." };
		} catch (error) {
			if (error.errors) {
				return { zodError: error?.errors };
			}

			return { error: "Hubo un error" };
		}
	}

	static async updateCategory({ id, nameCategory, userId }) {
		try {
			const result = await categorySchema.parseAsync({
				id,
				nameCategory,
				userId: parseInt(userId),
			});
			const sequelize = fnSequelize();
			await sequelize.query(
				"EXEC SP_CATEGORIES_ISSUES :id, :nameCategory, :userId",
				{
					replacements: {
						id: result.id,
						nameCategory: result.nameCategory,
						userId: result.userId,
					},
				},
			);
			sequelize.close();
			return { msg: "Categoría actualizada." };
		} catch (error) {
			if (error.errors) {
				return { zodError: error?.errors };
			}
			return { error: "Hubo un error" };
		}
	}
}
