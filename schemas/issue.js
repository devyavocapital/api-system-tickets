import mongoose from "mongoose";

const IssueSchema = new mongoose.Schema({
	nameClient: {
		type: String,
		trim: true,
		min: 1,
		required: [true, "Nombre del cliente es obligatorio."],
		lowercase: true,
	},
	lastnameClient: {
		type: String,
		trim: true,
		lowercase: true,
	},
	motherLastnameClient: {
		type: String,
		trim: true,
		lowercase: true,
	},
	creditNumber: {
		type: String,
		trim: true,
	},
	socialNumber: {
		type: String,
		trim: true,
	},
	initialComment: {
		type: String,
		trim: true,
	},
	assingTo: {
		type: Number,
		trim: true,
	},
	status: {
		type: String,
		trim: true,
		required: [true, "El status es obligatorio"],
	},
	category: {
		type: String,
		trim: true,
	},
	daysConfig: {
		type: Number,
		min: 1,
		required: [
			true,
			"La configuración de días a vencer ticket es obligatoria.",
		],
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "modeluser",
	},
	created_At: {
		type: Date,
		default: Date.now(),
	},
});

const issues =
	mongoose.models["modelissue"] || mongoose.model("modelissue", IssueSchema);

export default issues;
