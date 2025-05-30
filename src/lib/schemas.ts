import { z } from "zod";

export const UserSchema = z.object({
  username: z.string().min(2, "Nome muito curto"),
  password: z.string().email("Email inválido"),
});
