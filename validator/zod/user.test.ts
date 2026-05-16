import { describe, it, expect } from "vitest";
import { registerUserSchema, loginUserSchema } from "./user";

describe("registerUserSchema (modo registro, isEdit=false)", () => {
  const schema = registerUserSchema(false);

  const validData = {
    name: "Juan Pérez",
    email: "juan@example.com",
    password: "Password1",
    passwordConfirm: "Password1",
  };

  it("valida datos correctos", () => {
    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("falla con name muy corto", () => {
    const result = schema.safeParse({ ...validData, name: "A" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/nombre/i);
    }
  });

  it("falla con email inválido", () => {
    const result = schema.safeParse({ ...validData, email: "no-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/correo/i);
    }
  });

  it("falla con contraseña sin mayúscula", () => {
    const result = schema.safeParse({
      ...validData,
      password: "password1",
      passwordConfirm: "password1",
    });
    expect(result.success).toBe(false);
  });

  it("falla con contraseña sin minúscula", () => {
    const result = schema.safeParse({
      ...validData,
      password: "PASSWORD1",
      passwordConfirm: "PASSWORD1",
    });
    expect(result.success).toBe(false);
  });

  it("falla con contraseña sin número", () => {
    const result = schema.safeParse({
      ...validData,
      password: "Password",
      passwordConfirm: "Password",
    });
    expect(result.success).toBe(false);
  });

  it("falla cuando las contraseñas no coinciden", () => {
    const result = schema.safeParse({ ...validData, passwordConfirm: "OtraPass1" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const confirmError = result.error.issues.find(
        (i) => i.path.includes("passwordConfirm")
      );
      expect(confirmError?.message).toBe("Las contraseñas no coinciden");
    }
  });
});

describe("registerUserSchema (modo edición, isEdit=true)", () => {
  const schema = registerUserSchema(true);

  it("valida con solo el nombre (email y password opcionales)", () => {
    const result = schema.safeParse({ name: "Nuevo Nombre" });
    expect(result.success).toBe(true);
  });

  it("falla con name muy corto en modo edición", () => {
    const result = schema.safeParse({ name: "A" });
    expect(result.success).toBe(false);
  });
});

describe("loginUserSchema", () => {
  it("valida credenciales correctas", () => {
    const result = loginUserSchema.safeParse({
      email: "user@example.com",
      password: "cualquier",
    });
    expect(result.success).toBe(true);
  });

  it("falla con email inválido", () => {
    const result = loginUserSchema.safeParse({ email: "no-email", password: "pass" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/correo/i);
    }
  });

  it("falla sin email", () => {
    const result = loginUserSchema.safeParse({ password: "pass" });
    expect(result.success).toBe(false);
  });

  it("falla sin password", () => {
    const result = loginUserSchema.safeParse({ email: "user@example.com" });
    expect(result.success).toBe(false);
  });
});
