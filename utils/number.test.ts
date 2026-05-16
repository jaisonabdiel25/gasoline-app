import { describe, it, expect } from "vitest";
import { formatNumber } from "./number";

describe("formatNumber", () => {
  it("formatea un número entero con dos decimales", () => {
    expect(formatNumber(100)).toBe("100.00");
  });

  it("formatea un número con decimales", () => {
    expect(formatNumber(1234.5)).toBe("1,234.50");
  });

  it("formatea cero", () => {
    expect(formatNumber(0)).toBe("0.00");
  });

  it("formatea números negativos", () => {
    expect(formatNumber(-50.5)).toBe("-50.50");
  });

  it("retorna '0.00' para NaN", () => {
    expect(formatNumber(NaN)).toBe("0.00");
  });

  it("retorna '0.00' para null", () => {
    expect(formatNumber(null as unknown as number)).toBe("0.00");
  });

  it("retorna '0.00' para undefined", () => {
    expect(formatNumber(undefined as unknown as number)).toBe("0.00");
  });

  it("formatea números grandes con separadores de miles", () => {
    expect(formatNumber(1000000)).toBe("1,000,000.00");
  });

  it("redondea a dos decimales", () => {
    expect(formatNumber(1.999)).toBe("2.00");
  });
});
