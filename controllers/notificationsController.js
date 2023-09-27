import { NotificationnModel } from "../models/notification.js";

export const createNotification = async (req, res) => {
	const { nameClient, userAssignated } = req.body;

	const id = "null";

	const response = await NotificationnModel.createNotification({
		id,
		nameClient,
		userId: req.usuario.id,
		userAssignated,
	});

	return res.json(response);
};

export const updateDataNotification = async (req, res) => {
	const { originalClient, userAssignated, newNameClient } = req.body;
	const id = "null";

	const response = await NotificationnModel.updateDataNotification({
		id,
		originalClient,
		userAssignated,
		newNameClient,
		userId: req.usuario.id,
	});

	return res.json(response);
};

export const getNotifications = async (req, res) => {
	const response = await NotificationnModel.getNotifications({
		userId: req.usuario.id,
	});

	return res.json(response);
};

export const updateNotification = async (req, res) => {
	const { id, readed, active } = req.body;

	const response = await NotificationnModel.updateNotification({
		id,
		readed,
		active,
	});

	return res.json(response);
};
