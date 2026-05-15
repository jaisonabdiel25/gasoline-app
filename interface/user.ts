export type { User } from "@prisma/client";

export interface LoginUser {
    email: string;
    password: string
}

export interface UserRegisterValues extends LoginUser {
    name: string;
    passwordConfirm: string
}
