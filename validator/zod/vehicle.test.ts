import { describe, it, expect } from "vitest";
import { formSchemaVehicle } from "./vehicle";

describe("formSchemaVehicle", () => {
  const validVehicle = {
    name: "Mi Auto",
    isMain: false,
  };

  it("valida un vehículo mínimo correcto", () => {
    const result = formSchemaVehicle.safeParse(validVehicle);
    expect(result.success).toBe(true);
  });

  it("valida un vehículo con todos los campos", () => {
    const result = formSchemaVehicle.safeParse({
      name: "Corolla",
      model: "Sedan",
      year: 2020,
      userId: "user-123",
      isMain: true,
    });
    expect(result.success).toBe(true);
  });

  it("falla con name muy corto", () => {
    const result = formSchemaVehicle.safeParse({ ...validVehicle, name: "A" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/corto/i);
    }
  });

  it("falla sin name", () => {
    const result = formSchemaVehicle.safeParse({ isMain: false });
    expect(result.success).toBe(false);
  });

  it("falla con year menor a 1900", () => {
    const result = formSchemaVehicle.safeParse({ ...validVehicle, year: 1800 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/año inválido/i);
    }
  });

  it("falla con year futuro", () => {
    const futureYear = new Date().getFullYear() + 1;
    const result = formSchemaVehicle.safeParse({ ...validVehicle, year: futureYear });
    expect(result.success).toBe(false);
  });

  it("valida con year del año actual", () => {
    const currentYear = new Date().getFullYear();
    const result = formSchemaVehicle.safeParse({ ...validVehicle, year: currentYear });
    expect(result.success).toBe(true);
  });

  it("falla sin isMain", () => {
    const result = formSchemaVehicle.safeParse({ name: "Auto" });
    expect(result.success).toBe(false);
  });

  it("acepta model y userId opcionales sin valor", () => {
    const result = formSchemaVehicle.safeParse({ name: "Mi Auto", isMain: false });
    expect(result.success).toBe(true);
  });
});
