import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { urlApi } from "../db/config.js";
import user from "../schemas/user.js";

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
			await mongoose.connect(urlApi);

			if (!password) {
				return { error: "Debe de especificar su password.", status: 400 };
			}

			const userExist = await user.findOne({ email });

			if (userExist) {
				return { error: "Ya existe un usuario con este correo.", status: 400 };
			}

			const salt = await bcrypt.genSalt(10);
			const newPass = await bcrypt.hash(password, salt);

			const newUser = user({
				email,
				password: newPass,
				category: parseInt(category),
				name,
				lastname,
				motherLastname,
			});
			await newUser.save();

			await mongoose.disconnect();

			return { msg: "Usuario creado correctamente", status: 201 };
		} catch (error) {
			console.log({ errorMongo: error });
			return { error };
		}
	}
}
