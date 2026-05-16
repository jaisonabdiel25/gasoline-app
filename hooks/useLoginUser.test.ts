import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useLoginUser } from "./useLoginUser";

describe("useLoginUser", () => {
  it("retorna el formulario con valores por defecto vacíos", () => {
    const { result } = renderHook(() => useLoginUser());
    expect(result.current.form.getValues()).toEqual({
      email: "",
      password: "",
    });
  });

  it("expone el objeto form", () => {
    const { result } = renderHook(() => useLoginUser());
    expect(result.current.form).toBeDefined();
    expect(typeof result.current.form.handleSubmit).toBe("function");
  });

  it("el formulario tiene el campo email", () => {
    const { result } = renderHook(() => useLoginUser());
    expect(result.current.form.getValues("email")).toBe("");
  });

  it("el formulario tiene el campo password", () => {
    const { result } = renderHook(() => useLoginUser());
    expect(result.current.form.getValues("password")).toBe("");
  });
});
