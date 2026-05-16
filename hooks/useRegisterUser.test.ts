import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRegisterUser } from "./useRegisterUser";
import * as userServices from "@/services/user";
import { User } from "@/interface/user";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock("@/services/user", () => ({
  registerUser: vi.fn(),
  updateUser: vi.fn(),
}));

const existingUser: User = {
  id: "user-1",
  name: "Juan",
  email: "juan@example.com",
  createdAt: new Date(),
  updatedAt: null,
  image: null,
  emailVerified: null,
  password: null,
};

describe("useRegisterUser (modo registro)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retorna formulario con valores vacíos por defecto", () => {
    const { result } = renderHook(() => useRegisterUser({}));
    expect(result.current.form.getValues()).toEqual({
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    });
  });

  it("expone la función onSubmit", () => {
    const { result } = renderHook(() => useRegisterUser({}));
    expect(typeof result.current.onSubmit).toBe("function");
  });

  it("expone el objeto form", () => {
    const { result } = renderHook(() => useRegisterUser({}));
    expect(result.current.form).toBeDefined();
  });

  it("onSubmit registro exitoso: llama a registerUser y navega a /signin", async () => {
    vi.mocked(userServices.registerUser).mockResolvedValue({ isSuccess: true });

    const { result } = renderHook(() => useRegisterUser({}));

    await act(async () => {
      await result.current.onSubmit({
        name: "Pedro",
        email: "pedro@example.com",
        password: "Pass123",
        passwordConfirm: "Pass123",
      });
    });

    expect(userServices.registerUser).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Pedro", email: "pedro@example.com" })
    );
    expect(mockPush).toHaveBeenCalledWith("/signin");
  });

  it("onSubmit registro fallido: no navega", async () => {
    vi.mocked(userServices.registerUser).mockResolvedValue({ isSuccess: false });

    const { result } = renderHook(() => useRegisterUser({}));

    await act(async () => {
      await result.current.onSubmit({
        name: "Pedro",
        email: "pedro@example.com",
        password: "Pass123",
        passwordConfirm: "Pass123",
      });
    });

    expect(mockPush).not.toHaveBeenCalled();
  });
});

describe("useRegisterUser (modo edición)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("pre-rellena el formulario con los datos del usuario", () => {
    const { result } = renderHook(() =>
      useRegisterUser({ isEdit: true, user: existingUser })
    );
    expect(result.current.form.getValues("name")).toBe("Juan");
    expect(result.current.form.getValues("email")).toBe("juan@example.com");
  });

  it("deja password vacío en modo edición", () => {
    const { result } = renderHook(() =>
      useRegisterUser({ isEdit: true, user: existingUser })
    );
    expect(result.current.form.getValues("password")).toBe("");
  });

  it("onSubmit edición exitosa: llama a updateUser y navega a /profile", async () => {
    vi.mocked(userServices.updateUser).mockResolvedValue({ isSuccess: true });

    const { result } = renderHook(() =>
      useRegisterUser({ isEdit: true, user: existingUser })
    );

    await act(async () => {
      await result.current.onSubmit({
        name: "Juan Actualizado",
        email: "juan@example.com",
        password: "",
        passwordConfirm: "",
      });
    });

    expect(userServices.updateUser).toHaveBeenCalledWith(
      "user-1",
      expect.objectContaining({ name: "Juan Actualizado" })
    );
    expect(mockPush).toHaveBeenCalledWith("/profile");
  });

  it("onSubmit edición fallida: no navega", async () => {
    vi.mocked(userServices.updateUser).mockResolvedValue({ isSuccess: false });

    const { result } = renderHook(() =>
      useRegisterUser({ isEdit: true, user: existingUser })
    );

    await act(async () => {
      await result.current.onSubmit({
        name: "Juan",
        email: "juan@example.com",
        password: "",
        passwordConfirm: "",
      });
    });

    expect(mockPush).not.toHaveBeenCalled();
  });
});
