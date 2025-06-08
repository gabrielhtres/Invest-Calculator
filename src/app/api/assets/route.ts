import { AssetData } from "@/app/types";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/createServerClient";

const assetSchema = z.object({
  userId: z.string(),
  name: z.string(),
  ticker: z.string(),
  price: z.number().positive(),
  quantity: z.number().nonnegative(),
  total: z.number().nonnegative(),
  type: z.enum(["stock", "etf", "bdr", "fii", "treasure"]),
  percentage: z.number().optional(),
});

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const assets = await prisma.asset.findMany({
      where: {
        userId: user?.id ?? "",
      },
    });

    return NextResponse.json(assets);
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
    const validated = assetSchema.parse({
      ...body,
    });

    const newAsset = await prisma.asset.create({
      data: {
        ...validated,
        userId: user?.id ?? "",
      },
    });

    return NextResponse.json(newAsset);
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

export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { erro: "ID do ativo é obrigatório" },
        { status: 400 }
      );
    }

    // const asset = await prisma.asset.findFirst({
    //   where: {
    //     id: Number(id),
    //   },
    // });

    // if (!asset) {
    //   return NextResponse.json(
    //     { erro: "Ativo não encontrado" },
    //     { status: 404 }
    //   );
    // }

    const body = await req.json();
    const validated = assetSchema.parse({
      ...body,
    });

    const updatedAsset = await prisma.asset.update({
      where: { id: Number(id) },
      data: validated,
    });

    return NextResponse.json(updatedAsset);
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

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { erro: "ID do ativo é obrigatório" },
        { status: 400 }
      );
    }

    const asset = await prisma.asset.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!asset) {
      return NextResponse.json(
        { erro: "Ativo não encontrado" },
        { status: 404 }
      );
    }

    await prisma.asset.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Ativo deletado com sucesso" });
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
