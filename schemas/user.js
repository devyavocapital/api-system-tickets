import { z } from "zod";

export const userSchema = z.object({
	email: z
		.string({ required_error: "El email es obligatorio" })
		.email({ message: "Correo inválido" })
		.trim()
		.toLowerCase(),
	password: z
		.string({ required_error: "La contraseña es obligatoria" })
		.min(8, { message: "Debe tener mínimo 8 caracteres" })
		.max(16, { message: "Debe tener un máximo de 16 caracteres" })
		.regex(/^(?=.*d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^wds:])([^s]){8,16}/, {
			message: "No contiene ningun caracter especial, ni longitud necesaria",
		})
		.trim()
		.toLowerCase(),
	category: z
		.number({ message: "La categoria debe ser especificada" })
		.int()
		.min(1),
	name: z
		.string({ required_error: "El nombre es obligatorio" })
		.trim()
		.min(1, { message: "El nombre no puede ir vacío" })
		.toLowerCase(),
	lastname: z
		.string({ required_error: "El apellido paterno es obligatorio" })
		.trim()
		.min(1, { message: "El apellido paterno no puede ir vacío" })
		.toLowerCase(),
	motherLastname: z.string().toLowerCase().trim().optional(),
});
