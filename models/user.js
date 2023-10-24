import bcrypt from "bcrypt";
import { fnSequelize } from "../db/config.js";
import { userSchema } from "../schemas/user.js";
import { capitlizeFn } from "../utils/capitalizeFn.js";

export class UserModel {
	static async createUser({
		email,
		password,
		category,
		name,
		lastname,
		motherLastname,
	}) {
		try {
			await userSchema.parseAsync({
				email,
				password,
				category: parseInt(category),
				name,
				lastname,
				motherLastname,
			});
			const sequelize = fnSequelize();
			// hashear password
			const salt = await bcrypt.genSalt(10);
			const newPass = await bcrypt.hash(password, salt);

			await sequelize.query(
				"EXEC SP_NEW_USER :email, :newPass, :category, :nameCapitalize, :lastNameCapitalize, :motherLastNameCapitalize",
				{
					replacements: {
						email,
						newPass,
						category: parseInt(category),
						nameCapitalize: capitlizeFn({ text: name }),
						lastNameCapitalize: capitlizeFn({ text: lastname }),
						motherLastNameCapitalize: capitlizeFn({ text: motherLastname }),
					},
				},
			);
			sequelize.close();

			return { msg: "Usuario creado correctamente" };
		} catch (error) {
			if (error.errors) {
				return { zodError: error?.errors };
			}
			const errorLog = `${error.original}`;
			return { error: errorLog };
		}
	}
}
