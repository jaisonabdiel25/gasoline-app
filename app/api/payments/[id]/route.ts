import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  const { id } = params;

  const payment = await prisma.payment.findFirst({
    where: {
      id: id,
    },
  });

  if (!payment) {
    return NextResponse.json(
      { message: "Payment not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(payment);
}
