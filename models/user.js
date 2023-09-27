import bcrypt from "bcrypt";
import { fnSequelize } from "../db/config.js";

export class UserModel {
	static async createUser({
		email,
		password,
		category,
		nombre,
		ap_paterno,
		ap_materno,
	}) {
		if (email === "" || email === undefined) {
			return { error: "El campo email es obligatorio" };
		}

		const validationRegex =
			"\^(?=.*d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^wds:])([^s]){8,16}";

		if (!password.match(validationRegex)) {
			return {
				error:
					"El campo password es debe tener 1 caracter en minusculas, 1 en mayusculas, 1 número y un caracter especial",
			};
		}

		if (password === "" || password === undefined) {
			return { error: "El campo password es obligatorio" };
		}

		try {
			const sequelize = fnSequelize();
			// hashear password
			const salt = await bcrypt.genSalt(10);
			const newPass = await bcrypt.hash(password, salt);

			await sequelize.query(
				`EXEC SP_NEW_USER '${email.toLowerCase()}', '${newPass}', ${category}, '${nombre.toLowerCase()}', '${ap_paterno.toLowerCase()}', '${ap_materno.toLowerCase()}'`,
			);
			sequelize.close();

			return { msg: "Usuario creado correctamente" };
		} catch (error) {
			console.log(error);
			const errorLog = `${error.original}`;
			return { error: errorLog };
		}
	}
}
