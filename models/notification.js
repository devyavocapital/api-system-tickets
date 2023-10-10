import { fnSequelize } from "../db/config.js";
import { notificationSchema } from "../schemas/notification.js";

export class NotificationnModel {
	static async createNotification({ id, nameClient, userId, userAssignated }) {
		// [dbo].[SP_NOTIFICATIONS] (@ID_NOTIFICATION INT, @CLIENT VARCHAR(MAX), @USER_CREATED INT, @USER_ASSIGNATED INT, @READED BIT, @ACTIVE BIT)
		try {
			await notificationSchema.parseAsync({
				id,
				nameClient,
				userId,
				userAssignated,
			});
			const sequelize = fnSequelize();
			await sequelize.query(
				`EXEC SP_NOTIFICATIONS ${id}, '${nameClient}', ${parseInt(
					userId,
				)}, ${userAssignated}, 0, 1, NULL`,
			);
			sequelize.close();
			return { msg: "Notificación agregada." };
		} catch (error) {
			if (error.errors) {
				return { zodError: error?.errors };
			}
			return { error: "Hubo un error" };
		}
	}

	static async updateDataNotification({
		id,
		originalClient,
		userAssignated,
		newNameClient,
		userId,
	}) {
		// [dbo].[SP_NOTIFICATIONS] (@ID_NOTIFICATION INT, @CLIENT VARCHAR(MAX), @USER_CREATED INT, @USER_ASSIGNATED INT, @READED BIT, @ACTIVE BIT)
		try {
			const sequelize = fnSequelize();
			await sequelize.query(
				`EXEC SP_NOTIFICATIONS ${id}, '${originalClient}', ${userId}, ${userAssignated}, 0, 1, '${newNameClient}'`,
			);
			sequelize.close();
			return { msg: "Notificación Actualizada." };
		} catch (error) {
			return { error: "Hubo un error" };
		}
	}

	static async getNotifications({ userId }) {
		try {
			const sequelize = fnSequelize();
			const notifications = await sequelize.query(
				`EXEC SP_LST_NOTIFICATIONS ${userId}`,
			);
			sequelize.close();
			return notifications;
		} catch (error) {
			console.log(error);
			return { error: "Hubo un error" };
		}
	}

	static async updateNotification({ id, readed, active }) {
		// [dbo].[SP_NOTIFICATIONS] (@ID_NOTIFICATION INT, @CLIENT VARCHAR(MAX), @USER_CREATED INT, @USER_ASSIGNATED INT, @READED BIT, @ACTIVE BIT)
		try {
			const sequelize = fnSequelize();
			await sequelize.query(
				`EXEC SP_NOTIFICATIONS ${id}, '', '', '', ${readed}, ${active}, NULL`,
			);
			sequelize.close();
			return { msg: "Notificación actualizada." };
		} catch (error) {
			console.log(error);
			return { error: "Hubo un error" };
		}
	}
}
