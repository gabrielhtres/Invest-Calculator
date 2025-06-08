import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/createServerClient";

const requestSchema = z.object({
  bdr: z.number(),
  etf: z.number(),
  fii: z.number(),
  stock: z.number(),
  treasure: z.number(),
});

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const assetsMeta = await prisma.assetsMeta.findFirst({
      where: {
        userId: user?.id ?? "",
      },
    });

    return NextResponse.json(assetsMeta);
  } catch {
    return NextResponse.json({ erro: "Erro interno" }, { status: 500 });
  }
}

// export async function POST(req: NextRequest) {
//   try {
//     const supabase = await createSupabaseServerClient();

//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     const body = await req.json();

//     const validated = requestSchema.parse({
//       ...body,
//     });

//     const assetsMeta = await prisma.assetsMeta.findFirst({
//       where: {
//         userId: user?.id ?? "",
//       },
//     });

//     const newAssetsMeta = !assetsMeta
//       ? await prisma.assetsMeta.create({
//           data: {
//             userId: user?.id ?? "",
//             ...validated,
//           },
//         })
//       : await prisma.assetsMeta.update({
//           where: { id: assetsMeta.id },
//           data: {
//             ...validated,
//           },
//         });

//     return NextResponse.json(newAssetsMeta);
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return NextResponse.json(
//         { erro: "Dados inválidos", detalhes: error.errors },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json({ erro: "Erro interno" }, { status: 500 });
//   }
// }

export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { erro: "ID do ativo é obrigatório" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const validated = requestSchema.parse({
      ...body,
    });

    const newAssetMeta = await prisma.assetsMeta.update({
      where: {
        id: Number(id),
      },
      data: {
        ...validated,
      },
    });

    return NextResponse.json(newAssetMeta);
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
