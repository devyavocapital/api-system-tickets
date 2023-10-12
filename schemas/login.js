import { z } from "zod";

export const loginSchema = z.object({
	email: z
		.string({ required_error: "El email es obligatorio" })
		.email({ message: "Correo inválido" })
		.trim()
		.toLowerCase(),
	password: z
		.string({ required_error: "La contraseña es obligatoria" })
		.min(8, { message: "Debe tener mínimo 8 caracteres" })
		.max(16, { message: "Debe tener un máximo de 16 caracteres" })
		.trim(),
});
