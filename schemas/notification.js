import { z } from "zod";

export const notificationSchema = z.object({
	id: z.number().int().nullable().optional(),
	nameClient: z
		.string({ required_error: "El nombre del cliente es obligatorio" })
		.trim()
		.min(1, { message: "El nombre del cliente no puede ir vacío" }),
	userId: z.number().min(1).int(),
	userAssignated: z.number().min(0).int().optional(),
});
