import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const size = Number(searchParams.get("size") ?? "10");
  const page = Number(searchParams.get("page") ?? "0");

  if (isNaN(size)) {
    return NextResponse.json(
      { error: "Invalid size parameter" },
      { status: 400 }
    );
  }

  if (isNaN(page)) {
    return NextResponse.json(
      { error: "Invalid page parameter" },
      { status: 400 }
    );
  }

  const payments = await prisma.payment.findMany({
    take: size,
    skip: page * size,
  });
  return NextResponse.json(payments);
}
