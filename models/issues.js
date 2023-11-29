import mongoose from "mongoose";
import { urlApi } from "../db/config.js";
import issue from "../schemas/issue.js";

export class IssuesModel {
	static async getIssues({ id = "null", nameClient = "null" }) {
		try {
			await mongoose.connect(urlApi);

			if (id !== "null") {
				const issuesList = await issue.findById(id);
				await mongoose.disconnect();
				return issuesList;
			}

			if (id === "null" && nameClient !== "null") {
				const issuesList = await issue.find({
					nameClient: { $regex: nameClient },
				});
				await mongoose.disconnect();
				return issuesList;
			}

			const issuesList = await issue.find();
			await mongoose.disconnect();

			return issuesList;
		} catch (error) {
			console.log(error);
			return { error: "Hubo un error" };
		}
	}

	static async createIssue({
		nameClient,
		lastnameClient = "null",
		motherLastnameClient = "null",
		creditNumber,
		socialNumber,
		cardNumber,
		initialComment = "",
		assignTo = 0,
		status = "pendient",
		category = 0,
		daysConfig,
		userId,
	}) {
		try {
			await mongoose.connect(urlApi);

			const newIssue = issue({
				nameClient,
				lastnameClient,
				motherLastnameClient,
				creditNumber,
				socialNumber,
				cardNumber,
				initialComment,
				assignTo,
				status,
				category,
				daysConfig,
				userId,
			});

			const issueAdded = await newIssue.save();
			await mongoose.disconnect();
			return { msg: "Incidencia creada correctamente", issueAdded };
		} catch (error) {
			console.log(error);
			return { error };
		}
	}

	static async updateIssue({
		id,
		nameClient,
		lastnameClient = "null",
		motherLastnameClient = "null",
		creditNumber,
		socialNumber,
		cardNumber,
		assignTo = 0,
		status = "pendient",
		category = 0,
		daysConfig,
	}) {
		try {
			await mongoose.connect(urlApi);

			const issueExist = await issue.findById(id);
			if (!issueExist) {
				return {
					error: "Error: No existe incidencia con este ID.",
					status: 401,
				};
			}

			await issue.findByIdAndUpdate(id, {
				nameClient,
				lastnameClient,
				motherLastnameClient,
				creditNumber,
				socialNumber,
				cardNumber,
				assignTo,
				status,
				category: parseInt(category),
				daysConfig: parseInt(daysConfig),
			});

			await mongoose.disconnect();

			return { msg: "Incidencia actualizada correctamente", status: 200 };
		} catch (error) {
			console.log(error);
			return { error };
		}
	}
}
