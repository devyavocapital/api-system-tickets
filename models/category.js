import { fnSequelize } from "../db/config.js";

export class CategoryModel {
	static async getCategories({ id = "null" }) {
		try {
			const sequelize = fnSequelize();
			const categories = await sequelize.query(
				`EXEC SP_LST_CATEGORY_ISSUES ${id}`,
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
			const sequelize = fnSequelize();
			await sequelize.query(
				`EXEC SP_CATEGORIES_ISSUES ${id}, '${nameCategory}', ${userId}`,
			);
			sequelize.close();
			return { msg: "Categoría agregada." };
		} catch (error) {
			console.log(error);
			return { error: "Hubo un error" };
		}
	}

	static async updateCategory({ id = "null", nameCategory, userId }) {
		try {
			const sequelize = fnSequelize();
			await sequelize.query(
				`EXEC SP_LST_CATEGORY_ISSUES ${id}, '${nameCategory}', ${userId}`,
			);
			sequelize.close();
			return { msg: "Categoría actualizada." };
		} catch (error) {
			console.log(error);
			return { error: "Hubo un error" };
		}
	}
}
