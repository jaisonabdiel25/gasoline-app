import { describe, it, expect } from "vitest";
import { createValidator } from "./users";

const validUser = {
  email: "test@example.com",
  firstName: "Juan",
  lastName: "Pérez",
  password: "secreto",
  passwordConfirm: "secreto",
};

describe("createValidator (users)", () => {
  it("valida un array con un usuario correcto", async () => {
    await expect(createValidator.validate([validUser])).resolves.toBeDefined();
  });

  it("falla con email inválido", async () => {
    const data = [{ ...validUser, email: "no-es-email" }];
    await expect(createValidator.validate(data)).rejects.toThrow();
  });

  it("falla sin email", async () => {
    const { email: _email, ...rest } = validUser;
    await expect(createValidator.validate([rest])).rejects.toThrow();
  });

  it("falla sin firstName", async () => {
    const { firstName: _f, ...rest } = validUser;
    await expect(createValidator.validate([rest])).rejects.toThrow();
  });

  it("falla sin lastName", async () => {
    const { lastName: _l, ...rest } = validUser;
    await expect(createValidator.validate([rest])).rejects.toThrow();
  });

  it("falla con contraseña menor a 6 caracteres", async () => {
    const data = [{ ...validUser, password: "123", passwordConfirm: "123" }];
    await expect(createValidator.validate(data)).rejects.toThrow();
  });

  it("falla cuando las contraseñas no coinciden", async () => {
    const data = [{ ...validUser, passwordConfirm: "diferente" }];
    await expect(createValidator.validate(data)).rejects.toThrow();
  });

  it("valida un array vacío", async () => {
    await expect(createValidator.validate([])).resolves.toEqual([]);
  });

  it("valida múltiples usuarios correctos", async () => {
    const users = [
      validUser,
      { ...validUser, email: "otro@example.com" },
    ];
    await expect(createValidator.validate(users)).resolves.toBeDefined();
  });
});
