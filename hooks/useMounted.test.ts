import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useMounted } from "./useMounted";

describe("useMounted", () => {
  it("retorna true en el cliente (jsdom)", () => {
    const { result } = renderHook(() => useMounted());
    expect(result.current).toBe(true);
  });

  it("retorna un booleano", () => {
    const { result } = renderHook(() => useMounted());
    expect(typeof result.current).toBe("boolean");
  });

  it("el valor es estable entre re-renders", () => {
    const { result, rerender } = renderHook(() => useMounted());
    const first = result.current;
    rerender();
    expect(result.current).toBe(first);
  });

  it("múltiples instancias del hook retornan el mismo valor", () => {
    const { result: r1 } = renderHook(() => useMounted());
    const { result: r2 } = renderHook(() => useMounted());
    expect(r1.current).toBe(r2.current);
  });
});
