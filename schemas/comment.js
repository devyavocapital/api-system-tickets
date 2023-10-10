import { z } from "zod";

export const commentSchema = z.object({
	id: z.string().nullable(),
	description: z
		.string({ required_error: "La descripción es obligatorio" })
		.trim()
		.min(1, { message: "La descripcion no puede ir vacía" }),
	id_issue: z.number().int().min(1),
	userAssignated: z.number().int().min(0),
	status: z.string({ required_error: "El campo status es obligatorio" }),
	fileName: z.string().nullable().optional(),
	userId: z.number().int().min(1),
});
