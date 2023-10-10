import { z } from "zod";

export const issueSchema = z.object({
	id: z.string().nullable().optional(),
	nameClient: z
		.string({ required_error: "El nombre del cliente es obligatorio" })
		.trim()
		.min(1, { message: "El nombre del cliente no puede ir vacío" }),
	lastnameClient: z.string().nullable().optional(),
	motherLastnameClient: z.string().nullable().optional(),
	creditNumber: z.string().optional(),
	socialNumber: z.string().optional(),
	cardNumber: z.string().optional(),
	initialComment: z.string().nullable().optional(),
	assignTo: z.number().int().nullable().optional(),
	status: z.string({ required_error: "El campo status es obligatorio" }),
	category: z.number().int().nullable().optional(),
	daysConfig: z
		.number({ invalid_type_error: "Tipo de dato incorrecto" })
		.int()
		.min(1),
});
