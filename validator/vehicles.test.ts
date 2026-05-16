import { describe, it, expect } from "vitest";
import { createValidator, updateVehicleValidator } from "./vehicles";

const validUuid = "123e4567-e89b-12d3-a456-426614174000";

describe("createValidator (vehicles)", () => {
  const validVehicle = {
    userId: validUuid,
    name: "Mi Auto",
  };

  it("valida un vehículo mínimo correcto", async () => {
    await expect(createValidator.validate([validVehicle])).resolves.toBeDefined();
  });

  it("valida un vehículo con todos los campos", async () => {
    const data = [{ ...validVehicle, model: "Sedan", year: 2020 }];
    await expect(createValidator.validate(data)).resolves.toBeDefined();
  });

  it("falla sin userId", async () => {
    const { userId: _u, ...rest } = validVehicle;
    await expect(createValidator.validate([rest])).rejects.toThrow();
  });

  it("falla sin name", async () => {
    const { name: _n, ...rest } = validVehicle;
    await expect(createValidator.validate([rest])).rejects.toThrow();
  });

  it("falla con userId no UUID", async () => {
    const data = [{ ...validVehicle, userId: "no-es-uuid" }];
    await expect(createValidator.validate(data)).rejects.toThrow();
  });

  it("valida array vacío", async () => {
    await expect(createValidator.validate([])).resolves.toEqual([]);
  });
});

describe("updateVehicleValidator", () => {
  it("valida un objeto vacío (todos opcionales)", async () => {
    await expect(updateVehicleValidator.validate({})).resolves.toBeDefined();
  });

  it("valida actualizando sólo el name", async () => {
    await expect(updateVehicleValidator.validate({ name: "Nuevo Nombre" })).resolves.toBeDefined();
  });

  it("valida actualizando el year", async () => {
    await expect(updateVehicleValidator.validate({ year: 2022 })).resolves.toBeDefined();
  });

  it("falla si userId no es UUID", async () => {
    await expect(
      updateVehicleValidator.validate({ userId: "no-es-uuid" })
    ).rejects.toThrow();
  });
});
