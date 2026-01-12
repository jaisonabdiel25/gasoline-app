import { prisma } from "@/app/lib/prisma";
import { createValidator } from "@/app/validator/payments";
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

export async function POST(request: NextRequest) {

  const body = await request.json();

  const paymentToCreate = await createValidator.validate(body);

  const paymentListToCreate = paymentToCreate?.map(payment => ({
    amount: payment.amount,
  }))

  const result = await prisma.payment.createMany({
    data: paymentListToCreate!,
  })

  return NextResponse.json(result);
}

