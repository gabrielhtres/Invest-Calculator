import { createSupabaseServerClient } from "@/lib/createServerClient";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const data = {
      class: {
        current: {
          stock: 0,
          etf: 0,
          bdr: 0,
          fii: 0,
          treasure: 0,
        },
        meta: {
          stock: 0,
          etf: 0,
          bdr: 0,
          fii: 0,
          treasure: 0,
        },
      },
      stock: {},
      bdr: {},
      etf: {},
      fii: {},
      treasure: {},
    };

    Object.keys(data).forEach(async (key) => {
      if (key === "class") {
        const assets = await prisma.asset.findMany({
          where: {
            userId: user?.id ?? "",
          },
        });

        const assetClasses = await prisma.assetClass.findMany({
          where: {
            userId: user?.id ?? "",
          },
        });

        assets.forEach((asset) => {
          if (asset.type in data.class.current) {
            data.class.current[asset.type] += asset.total;
            data.class.meta[asset.type] += asset.price * asset.quantity;
          }
        });
      }
    });

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ erro: "Erro interno" }, { status: 500 });
  }
}
