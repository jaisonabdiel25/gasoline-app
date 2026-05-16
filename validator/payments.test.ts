import { describe, it, expect } from "vitest";
import { createValidator, updatePaymentValidator } from "./payments";

const validUuid = "123e4567-e89b-12d3-a456-426614174000";

describe("createValidator (payments)", () => {
  const validPayment = {
    amount: 50.0,
    userId: validUuid,
    vehicleId: validUuid,
  };

  it("valida un pago correcto", async () => {
    await expect(createValidator.validate([validPayment])).resolves.toBeDefined();
  });

  it("falla sin amount", async () => {
    const { amount: _a, ...rest } = validPayment;
    await expect(createValidator.validate([rest])).rejects.toThrow();
  });

  it("falla sin userId", async () => {
    const { userId: _u, ...rest } = validPayment;
    await expect(createValidator.validate([rest])).rejects.toThrow();
  });

  it("falla sin vehicleId", async () => {
    const { vehicleId: _v, ...rest } = validPayment;
    await expect(createValidator.validate([rest])).rejects.toThrow();
  });

  it("falla con userId no UUID", async () => {
    const data = [{ ...validPayment, userId: "no-es-uuid" }];
    await expect(createValidator.validate(data)).rejects.toThrow();
  });

  it("falla con vehicleId no UUID", async () => {
    const data = [{ ...validPayment, vehicleId: "no-es-uuid" }];
    await expect(createValidator.validate(data)).rejects.toThrow();
  });

  it("valida un array vacío", async () => {
    await expect(createValidator.validate([])).resolves.toEqual([]);
  });
});

describe("updatePaymentValidator", () => {
  it("valida un objeto vacío (todos opcionales)", async () => {
    await expect(updatePaymentValidator.validate({})).resolves.toBeDefined();
  });

  it("valida actualizando sólo el amount", async () => {
    await expect(updatePaymentValidator.validate({ amount: 100 })).resolves.toBeDefined();
  });

  it("falla si vehicleId no es UUID", async () => {
    await expect(
      updatePaymentValidator.validate({ vehicleId: "no-es-uuid" })
    ).rejects.toThrow();
  });

  it("valida con campos opcionales correctos", async () => {
    const data = { amount: 30, userId: validUuid, vehicleId: validUuid };
    await expect(updatePaymentValidator.validate(data)).resolves.toBeDefined();
  });
});
