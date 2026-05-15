import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteValidator } from "@/validator/commonValidator";
import { createValidator } from "@/validator/payments";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const size = Number(searchParams.get("size") ?? "10");
  const page = Number(searchParams.get("page") ?? "0");

  if (isNaN(size)) {
    return NextResponse.json(
      { error: "Invalid size parameter" },
      { status: 400 },
    );
  }

  if (isNaN(page)) {
    return NextResponse.json(
      { error: "Invalid page parameter" },
      { status: 400 },
    );
  }

  const payments = await prisma.payment.findMany({
    take: size,
    skip: page * size,
  });
  return NextResponse.json(payments);
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const paymentToCreate = await createValidator.validate(body);

    const userIds = paymentToCreate?.map(({ userId }) => userId);

    const existingUsers = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true },
    });
    const existingUserIds = new Set(existingUsers.map((user) => user.id));

    const invalidUserIds =
      userIds?.filter((userId) => !existingUserIds.has(userId)) ?? [];

    if (invalidUserIds.length > 0) {
      return NextResponse.json(
        { error: `Invalid userIds: ${invalidUserIds.join(", ")}` },
        { status: 400 },
      );
    }

    const paymentListToCreate = paymentToCreate?.map(
      ({ amount, userId, vehicleId }) => ({
        amount: amount,
        userId: userId,
        vehicleId: vehicleId,
      }),
    );

    if (!paymentListToCreate || paymentListToCreate.length === 0) {
      return NextResponse.json(
        { error: "No valid payments to create" },
        { status: 400 },
      );
    }

    const result = await prisma.payment.createMany({
      data: paymentListToCreate,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const listId = await deleteValidator.validate(body);

    const ids = listId?.map(({ id }) => id);

    const existingPayment = await prisma.payment.findMany({
      where: { id: { in: ids } },
      select: { id: true },
    });
    const existingPaymentIds = new Set(existingPayment.map(({ id }) => id));

    const invalidPaymentIds =
      ids?.filter((userId) => !existingPaymentIds.has(userId)) ?? [];

    if (invalidPaymentIds.length > 0) {
      return NextResponse.json(
        { error: `Invalid paymentIds: ${invalidPaymentIds.join(", ")}` },
        { status: 400 },
      );
    }

    const result = await prisma.payment.deleteMany({
      where: { id: { in: ids } },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
