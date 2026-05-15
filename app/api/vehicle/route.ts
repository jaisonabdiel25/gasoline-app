import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteValidator } from "@/validator/commonValidator";
import { createValidator } from "@/validator/vehicles";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

    const existingVehicle = await prisma.vehicle.findMany({
      where: { id: { in: ids } },
      select: { id: true },
    });
    const existingVehicleIds = new Set(existingVehicle.map(({ id }) => id));

    const invalidvehiclesIds =
      ids?.filter((userId) => !existingVehicleIds.has(userId)) ?? [];

    if (invalidvehiclesIds.length > 0) {
      return NextResponse.json(
        { error: `Invalid vehicle: ${invalidvehiclesIds.join(", ")}` },
        { status: 400 },
      );
    }

    const result = await prisma.vehicle.deleteMany({
      where: { id: { in: ids } },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
