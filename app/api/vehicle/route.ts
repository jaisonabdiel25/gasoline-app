import { prisma } from "@/lib/prisma";
import { createValidator } from "@/validator/vehicles";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const vehicleToCreate = await createValidator.validate(body);

    const userIds = vehicleToCreate?.map(({ userId }) => userId);

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

    const vehicleListToCreate = vehicleToCreate?.map(
      ({ userId, name, model, year }) => ({
        name: name,
        model: model,
        year: year,
        userId: userId,
      }),
    );

    if (!vehicleListToCreate || vehicleListToCreate.length === 0) {
      return NextResponse.json(
        { error: "No valid vehicles to create" },
        { status: 400 },
      );
    }

    const result = await prisma.vehicle.createMany({
      data: vehicleListToCreate,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
