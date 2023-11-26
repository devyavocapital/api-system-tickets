import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { urlApi } from "../db/config.js";
import user from "../schemas/user.js";

export class Login {
	static async getLogin({ email, password }) {
		if (!email || !password) {
			return { error: "Error: Campo email o password está vacío." };
		}

		try {
			await mongoose.connect(urlApi);

			const userExist = await user.findOne({ email });
			if (!userExist) {
				return {
					error: "El usuario no existe, favor de validar su cuenta de email.",
				};
			}

			const passwordCorrect = await bcrypt.compare(
				password,
				userExist.password,
			);

			if (!passwordCorrect) {
				return { error: "Error: El password es incorrecto" };
			}

			const payload = {
				usuario: {
					id: userExist.id,
				},
			};

			await mongoose.disconnect();
			return payload;
		} catch (error) {
			console.log(error);
			return { error };
		}
	}

	static async getUserAuthenticated({ id }) {
		try {
			await mongoose.connect(urlApi);
			const usuario = await user
				.findById(id)
				.select(["_id", "email", "name", "lastname", "category"]);

			await mongoose.disconnect();
			return usuario;
		} catch (error) {
			console.log(error);
			return { error: "Hubo un error" };
		}
	}
}
