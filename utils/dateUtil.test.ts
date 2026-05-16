import { describe, it, expect } from "vitest";
import { parseLocalDate, timeAgo } from "./dateUtil";

describe("parseLocalDate", () => {
  it("parsea una fecha en formato YYYY-MM-DD correctamente", () => {
    const result = parseLocalDate("2024-01-15");
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(0); // enero = 0
    expect(result.getDate()).toBe(15);
  });

  it("parsea el primer día del año", () => {
    const result = parseLocalDate("2024-01-01");
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(1);
  });

  it("parsea el último día del año", () => {
    const result = parseLocalDate("2024-12-31");
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(11); // diciembre = 11
    expect(result.getDate()).toBe(31);
  });

  it("retorna un objeto Date", () => {
    const result = parseLocalDate("2023-06-20");
    expect(result).toBeInstanceOf(Date);
  });
});

describe("timeAgo", () => {
  it("retorna un string con sufijo en español", () => {
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
    const result = timeAgo(oneMinuteAgo);
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("retorna texto para una fecha reciente", () => {
    const justNow = new Date();
    const result = timeAgo(justNow);
    expect(result).toMatch(/hace|minuto|segundo/i);
  });

  it("retorna texto para una fecha antigua", () => {
    const oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
    const result = timeAgo(oneYearAgo);
    expect(result).toMatch(/hace/i);
  });
});
