import { describe, it, expect } from "vitest";
import { paymentSchema } from "./payment";

describe("paymentSchema", () => {
  it("valida datos correctos", () => {
    const result = paymentSchema.safeParse({ amount: 100, vehicleId: "abc-123" });
    expect(result.success).toBe(true);
  });

  it("falla con amount igual a 0", () => {
    const result = paymentSchema.safeParse({ amount: 0, vehicleId: "abc-123" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("El monto debe ser mayor a 0");
    }
  });

  it("falla con amount negativo", () => {
    const result = paymentSchema.safeParse({ amount: -10, vehicleId: "abc-123" });
    expect(result.success).toBe(false);
  });

  it("falla sin vehicleId", () => {
    const result = paymentSchema.safeParse({ amount: 50 });
    expect(result.success).toBe(false);
  });

  it("falla sin amount", () => {
    const result = paymentSchema.safeParse({ vehicleId: "abc-123" });
    expect(result.success).toBe(false);
  });

  it("falla sin ningún campo", () => {
    const result = paymentSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("valida amount decimal", () => {
    const result = paymentSchema.safeParse({ amount: 0.01, vehicleId: "abc-123" });
    expect(result.success).toBe(true);
  });
});
