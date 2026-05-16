import { prisma } from "@/lib/prisma";
import { createValidator } from "@/validator/users";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const userToCreate = await createValidator.validate(body);

    const userListToCreate = userToCreate?.map(
      ({ email, firstName, lastName, password }) => ({
        email,
        firstName,
        lastName,
        password,
      })
    );

    const result = await prisma.user.createMany({
      data: userListToCreate!,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
