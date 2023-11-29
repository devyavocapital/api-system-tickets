import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
	nameCategory: {
		type: String,
		required: [true, "Nombre de categpría obligatorio."],
		trim: true,
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
const categories =
	mongoose.models["modelcategory"] ||
	mongoose.model("modelcategory", CategorySchema);

export default categories;
