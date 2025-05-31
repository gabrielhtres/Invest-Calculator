import { AssetData } from "@/app/types";
import { prisma } from "@/lib/prisma";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from "next/headers";
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
    const newAssets: AssetData[] = [];

    await body.forEach(async (asset: AssetData) => {
      const validated = assetSchema.parse({
        ...asset,
        userId: user?.id ?? "",
      });

      const existingAsset = await prisma.asset.findFirst({
        where: {
          userId: validated.userId,
          ticker: validated.ticker,
        },
      });

      if (existingAsset) {
        const newAsset = await prisma.asset.update({
          where: { id: existingAsset.id },
          data: {
            quantity: existingAsset.quantity + validated.quantity,
            total: existingAsset.total + validated.total,
          },
        });

        newAssets.push(newAsset);
      } else {
        const newAsset = await prisma.asset.create({
          data: validated,
        });

        newAssets.push(newAsset);
      }
    });

    console.log("newAssets", newAssets);

    return NextResponse.json(newAssets);
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
