import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("combina clases simples", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("elimina valores falsy", () => {
    expect(cn("foo", false && "bar", null, undefined, "baz")).toBe("foo baz");
  });

  it("resuelve conflictos de tailwind con tailwind-merge", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
  });

  it("combina clases condicionales con clsx", () => {
    const active = true;
    expect(cn("base", active && "active")).toBe("base active");
  });

  it("retorna string vacío sin argumentos", () => {
    expect(cn()).toBe("");
  });

  it("maneja arrays de clases", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
  });

  it("maneja objetos de clases", () => {
    expect(cn({ foo: true, bar: false })).toBe("foo");
  });

  it("resuelve conflictos de colores de tailwind", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });
});
