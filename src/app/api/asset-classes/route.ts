import { AssetData } from "@/app/types";
import { prisma } from "@/lib/prisma";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const assetClassSchema = z.object({
  userId: z.string().min(1),
  name: z.string(),
  ticker: z.string(),
  price: z.number().positive(),
  quantity: z.number().nonnegative(),
  total: z.number().nonnegative(),
  type: z.enum(["stock", "etf", "bdr", "fii", "treasure"]),
  percentage: z.number().optional(),
});

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const supabase = createMiddlewareClient({ req, res });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const assetClasses = await prisma.assetClass.findMany({
      where: {
        userId: session?.user.id ?? "",
      },
    });

    return NextResponse.json(assetClasses);
  } catch (error) {
    return NextResponse.json({ erro: "Erro interno" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const supabase = createMiddlewareClient({ req, res });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const body = await req.json();
    const newAssets: AssetData[] = [];

    body.forEach(async (assetClass: AssetClassData) => {
      const validated = assetClassSchema.parse({
        ...asset,
        userId: session?.user.id ?? "",
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
