import { prisma } from "@/lib/prisma";
import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";

// const assetClassSchema = z.object({
//   userId: z.string().min(1),
//   name: z.string(),
//   ticker: z.string(),
//   price: z.number().positive(),
//   quantity: z.number().nonnegative(),
//   total: z.number().nonnegative(),
//   type: z.enum(["stock", "etf", "bdr", "fii", "treasure"]),
//   percentage: z.number().optional(),
// });
const requestSchema = z.object({
  stock: z.string().nonempty(),
  bdr: z.string().nonempty(),
  etf: z.string().nonempty(),
  fii: z.string().nonempty(),
  treasure: z.string().nonempty(),
});

export async function GET() {
  try {
    const supabase = createServerActionClient({ cookies: () => cookies() });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const assetClasses = await prisma.assetClass.findMany({
      where: {
        userId: session?.user.id ?? "",
      },
    });

    return NextResponse.json(assetClasses);
  } catch {
    return NextResponse.json({ erro: "Erro interno" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerActionClient({ cookies: () => cookies() });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const body = await req.json();

    const validated = requestSchema.parse({
      ...body,
    });

    const assetClass = await prisma.assetClass.findFirst({
      where: {
        userId: session?.user.id ?? "",
      },
    });

    const newAssetClass = !assetClass
      ? await prisma.assetClass.create({
          data: {
            userId: session?.user.id ?? "",
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
