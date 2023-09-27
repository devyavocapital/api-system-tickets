import bcrypt from "bcrypt";
import { fnSequelize } from "../db/config.js";

export class login {
	static async getLogin({ email, password }) {
		if (email === "" || email === undefined) {
			return { error: "Error: El campo email es obligatorio" };
		}

		if (password === "" || password === undefined) {
			return { error: "Error: El campo password es obligatorio" };
		}

		try {
			const sequelize = fnSequelize();
			const response = await sequelize.query(
				`EXEC SP_LOGIN NULL, '${email.toLowerCase()}'`,
			);
			sequelize.close();

			const user = response[0];
			//Comparar los passwords
			const passwordCorrect = await bcrypt.compare(password, user[0].password);
			if (!passwordCorrect) {
				return { error: "Error: El password es incorrecto" };
			}
			//firmar jwt
			const payload = {
				usuario: {
					id: user[0].id,
				},
			};
			return payload;
		} catch (error) {
			// console.error();
			const errorLog = `${error.original}`;
			return { error: errorLog };
		}
	}

	static async getUserAuthenticated({ id }) {
		try {
			const sequelize = fnSequelize();
			const usuario = await sequelize.query(`EXEC SP_LOGIN ${id}, NULL`);
			sequelize.close();

			return usuario;
		} catch (error) {
			console.log(error);
			return { error: "Hubo un error" };
		}
	}
}
