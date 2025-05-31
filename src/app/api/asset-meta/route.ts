import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/createServerClient";

const requestSchema = z.object({
  stock: z.string().nonempty(),
  bdr: z.string().nonempty(),
  etf: z.string().nonempty(),
  fii: z.string().nonempty(),
  treasure: z.string().nonempty(),
});

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const assetClasses = await prisma.assetClass.findMany({
      where: {
        userId: user?.id ?? "",
      },
    });

    return NextResponse.json(assetClasses);
  } catch {
    return NextResponse.json({ erro: "Erro interno" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const body = await req.json();

    const validated = requestSchema.parse({
      ...body,
    });

    const assetClass = await prisma.assetClass.findFirst({
      where: {
        userId: user?.id ?? "",
      },
    });

    const newAssetClass = !assetClass
      ? await prisma.assetClass.create({
          data: {
            userId: user?.id ?? "",
            ...validated,
          },
        })
      : await prisma.assetClass.update({
          where: { id: assetClass.id },
          data: {
            ...validated,
          },
        });

    return NextResponse.json(newAssetClass);
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
