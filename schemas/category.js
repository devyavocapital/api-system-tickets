import { z } from "zod";

export const categorySchema = z.object({
	id: z.string().nullable(),
	nameCategory: z
		.string({ required_error: "El nombre de la categoría es obligatorio" })
		.trim()
		.min(1, { message: "La descripcion no puede ir vacía" }),
	userId: z.number().int().min(1),
});
