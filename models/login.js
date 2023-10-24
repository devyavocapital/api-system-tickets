import bcrypt from "bcrypt";
import { fnSequelize } from "../db/config.js";
import { loginSchema } from "../schemas/login.js";

export class Login {
	static async getLogin({ email, password }) {
		const zodError = await loginSchema.safeParseAsync({ email, password });

		if (!zodError.success) {
			return { error: zodError.error.issues };
		}

		try {
			const sequelize = fnSequelize();
			const response = await sequelize.query("EXEC SP_LOGIN NULL, :email", {
				replacements: { email },
			});
			sequelize.close();

			if (response?.error) {
				return { error: response.error };
			}

			const user = response[0];

			const passwordCorrect = await bcrypt.compare(password, user[0].password);

			if (!passwordCorrect) {
				return { error: "Error: El password es incorrecto" };
			}

			const payload = {
				usuario: {
					id: user[0].id,
				},
			};

			return payload;
		} catch (error) {
			console.log(error);
			const errorLog = `${error.original}`;
			return { error: errorLog };
		}
	}

	static async getUserAuthenticated({ id }) {
		try {
			const sequelize = fnSequelize();
			const usuario = await sequelize.query("EXEC SP_LOGIN :id, NULL", {
				replacements: { id },
			});
			sequelize.close();

			return usuario;
		} catch (error) {
			console.log(error);
			return { error: "Hubo un error" };
		}
	}
}
