import { describe, it, expect } from "vitest";
import { deleteValidator } from "./commonValidator";

const validUuid = "123e4567-e89b-12d3-a456-426614174000";

describe("deleteValidator", () => {
  it("valida un array con un id UUID correcto", async () => {
    await expect(deleteValidator.validate([{ id: validUuid }])).resolves.toBeDefined();
  });

  it("valida múltiples ids UUID correctos", async () => {
    const data = [
      { id: validUuid },
      { id: "550e8400-e29b-41d4-a716-446655440000" },
    ];
    await expect(deleteValidator.validate(data)).resolves.toBeDefined();
  });

  it("falla con id que no es UUID", async () => {
    await expect(deleteValidator.validate([{ id: "no-es-uuid" }])).rejects.toThrow();
  });

  it("falla sin id", async () => {
    await expect(deleteValidator.validate([{}])).rejects.toThrow();
  });

  it("valida array vacío", async () => {
    await expect(deleteValidator.validate([])).resolves.toEqual([]);
  });
});
