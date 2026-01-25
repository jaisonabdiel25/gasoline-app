import { prisma } from "@/app/lib/prisma";
import { updatePaymentValidator } from "@/validator/payments";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params;

  const payment = await getPayment(id);

  if (!payment) {
    return NextResponse.json({ message: "Payment not found" }, { status: 404 });
  }

  return NextResponse.json(payment);
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const payment = await getPayment(id);

    if (!payment) {
      return NextResponse.json(
        { message: "Payment not found" },
        { status: 404 }
      );
    }

    const body = await request.json();

    const { amount, userId, vehicleId } = await updatePaymentValidator.validate(body);

    const updatedPayment = await prisma.payment.update({
      where: {
        id: id,
      },
      data: { amount, userId, vehicleId },
    });

    return NextResponse.json(updatedPayment);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

const getPayment = async (id: string) => {
  return await prisma.payment.findFirst({
    where: {
      id: id,
    },
  });
};
