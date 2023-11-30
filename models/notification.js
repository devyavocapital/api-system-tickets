import mongoose from "mongoose";
import { urlApi } from "../db/config.js";
import notifications from "../schemas/notification.js";

export class NotificationnModel {
	static async createNotification({ nameClient, userId, assignTo }) {
		try {
			await mongoose.connect(urlApi);

			const newNotification = notifications({
				nameClient,
				userId,
				assignTo,
			});

			await newNotification.save();

			await mongoose.disconnect();
			return { msg: "Notificación agregada.", status: 200 };
		} catch (error) {
			console.log(error);
			return { error };
		}
	}

	static async updateDataNotification({ id, assignTo, nameClient, userId }) {
		try {
			await mongoose.connect(urlApi);

			const notExist = await notifications.findById(id);
			if (!notExist) {
				return {
					error: "Error: No existe ninguna notificación con este ID",
					status: 401,
				};
			}

			const newNotification = await notifications.findByIdAndUpdate(id, {
				assignTo,
				nameClient,
				userId,
			});

			await mongoose.disconnect();
			return { msg: "Notificación Actualizada.", status: 200, newNotification };
		} catch (error) {
			return { error };
		}
	}

	static async getNotifications({ userId }) {
		try {
			await mongoose.connect(urlApi);
			const notificationsList = await notifications.find({ userId });
			await mongoose.disconnect();
			return notificationsList;
		} catch (error) {
			console.log(error);
			return { error };
		}
	}

	static async updateNotification({ id, readed, active }) {
		try {
			await mongoose.connect(urlApi);

			const notExist = await notifications.findById(id);
			if (!notExist) {
				return {
					error: { Error: "Ya no existe esta notificación" },
					status: 401,
				};
			}

			await notifications.findByIdAndUpdate(id, {
				readed,
				active,
			});

			await mongoose.disconnect();
			return { msg: "Notificación actualizada.", status: 200 };
		} catch (error) {
			console.log(error);
			return { error: "Hubo un error" };
		}
	}
}
