"use server";
import bcrypt from "bcrypt";
import { UserRegisterValues } from "@/interface/user";
import { prisma } from "@/lib/prisma";
import { CustomResponse } from "@/interface/global";
import { User } from "@prisma/client";

const saltRounds = 10;

export const resgisterUser = async (
  user: UserRegisterValues,
): Promise<CustomResponse<User>> => {
  try {
    const { email, password, name } = user;
    const userByEmail = await prisma.user.findMany({
      where: { email },
    });

    if (userByEmail.length > 0) {
      throw new Error("Error al crear usuario");
    }

    const passwordBcrypt = await bcrypt.hash(password, saltRounds);

    const userCreate = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordBcrypt,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return {
      data: userCreate as User,
      isSuccess: true,
    };
  } catch (errors) {
    console.error(errors);
    return {
      isSuccess: false,
      errors: ["Error al crear usuario"],
    };
  }
};
