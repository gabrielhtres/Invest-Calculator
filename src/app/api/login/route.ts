import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/createServerClient";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const body = await req.json();

    const validated = loginSchema.parse(body);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: validated.email,
      password: validated.password,
    });

    if (error) {
      return NextResponse.json({ erro: error.message }, { status: 400 });
    }

    if (!data.session) {
      return NextResponse.json(
        { erro: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: "Login bem-sucedido",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { erro: "Dados inválidos", detalhes: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ erro: "Erro interno" }, { status: 500 });
  }
}
