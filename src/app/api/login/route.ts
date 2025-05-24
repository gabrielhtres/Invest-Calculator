import { UserSchema } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const parse = UserSchema.safeParse(body);

    if (!parse.success) {
        const erros = parse.error.format();
        return NextResponse.json({ error: 'Dados inválidos', detalhes: erros }, { status: 400 });
    }

    const { nome, email } = parse.data;

    // ... salva no banco aqui

    return NextResponse.json({ sucesso: true }, { status: 201 });
}