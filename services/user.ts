"use server";
import bcrypt from "bcrypt";
import { UserRegisterValues } from "@/interface/user";
import { prisma } from "@/lib/prisma";
import { CustomResponse } from "@/interface/global";
import { User } from "@/interface/user";

const saltRounds = 10;

export const registerUser = async (
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

export const updateUser = async (
  id: string,
  user: UserRegisterValues,
): Promise<CustomResponse<User>> => {
  try {
    const { name } = user;

    await prisma.user.update({
      where: { id },
      data: {
        name,
      },
    });

    return {
      isSuccess: true,
    };
  } catch (errors) {
    console.error(errors);
    return {
      isSuccess: false,
      errors: ["Error al actualizar usuario"],
    };
  }
};

export const updateImageUser = async (id: string, image: string) => {
  try {
    await prisma.user.update({
      where: { id },
      data: {
        image,
      },
    });

    return {
      isSuccess: true,
    };
  } catch (errors) {
    console.error(errors);
    return {
      isSuccess: false,
      errors: ["Error al actualizar imagen de usuario"],
    };
  }
};
