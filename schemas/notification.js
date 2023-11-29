import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
	nameClient: {
		type: String,
		required: [true, "Nombre del cliente obligatorio"],
		trim: true,
	},
	assignTo: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "modeluser",
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "modeluser",
	},
	created_At: {
		type: Date,
		default: Date.now(),
	},
	readed: {
		type: Boolean,
		default: false,
	},
	active: {
		type: Boolean,
		default: true,
	},
});

const notifications =
	mongoose.models["modelnotification"] ||
	mongoose.model("modelnotification", NotificationSchema);

export default notifications;
