import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCreateVehicle } from "./useCreateVehicle";
import * as services from "@/services";
import { Vehicle } from "@/interface/vehicle";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock("next-auth/react", () => ({
  useSession: () => ({ data: { user: { id: "user-1" } } }),
}));

const mockToast = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn(), dismiss: vi.fn() }));
vi.mock("sonner", () => ({ toast: mockToast }));

vi.mock("@/services", () => ({
  createVehicle: vi.fn(),
  updateVehicle: vi.fn(),
}));

const existingVehicle: Vehicle = {
  id: "vehicle-1",
  name: "Corolla",
  model: "Sedan",
  year: 2020,
  userId: "user-1",
  isMain: true,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("useCreateVehicle (modo creación)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retorna el formulario y los handlers", () => {
    const { result } = renderHook(() => useCreateVehicle({ isEdit: false }));
    expect(result.current.form).toBeDefined();
    expect(typeof result.current.onSubmit).toBe("function");
    expect(typeof result.current.handleReset).toBe("function");
  });

  it("inicia con valores vacíos en modo creación", () => {
    const { result } = renderHook(() => useCreateVehicle({ isEdit: false }));
    expect(result.current.form.getValues("name")).toBe("");
    expect(result.current.form.getValues("isMain")).toBe(false);
  });

  it("inicia year como undefined en modo creación", () => {
    const { result } = renderHook(() => useCreateVehicle({ isEdit: false }));
    expect(result.current.form.getValues("year")).toBeUndefined();
  });

  it("onSubmit crear exitoso: llama a createVehicle, toast de éxito y navega", async () => {
    vi.mocked(services.createVehicle).mockResolvedValue({ isSuccess: true, data: existingVehicle });

    const { result } = renderHook(() => useCreateVehicle({ isEdit: false }));

    await act(async () => {
      await result.current.onSubmit({ name: "Nuevo Auto", isMain: false });
    });

    expect(services.createVehicle).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Nuevo Auto", userId: "user-1" })
    );
    expect(mockToast.success).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/vehicle");
  });

  it("onSubmit crear fallido: muestra toast de error y no navega", async () => {
    vi.mocked(services.createVehicle).mockResolvedValue({ isSuccess: false });

    const { result } = renderHook(() => useCreateVehicle({ isEdit: false }));

    await act(async () => {
      await result.current.onSubmit({ name: "Auto", isMain: false });
    });

    expect(mockToast.error).toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("handleReset: navega a /vehicle", () => {
    const { result } = renderHook(() => useCreateVehicle({ isEdit: false }));

    act(() => {
      result.current.handleReset();
    });

    expect(mockPush).toHaveBeenCalledWith("/vehicle");
  });
});

describe("useCreateVehicle (modo edición)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("pre-rellena el formulario con el vehículo existente", () => {
    const { result } = renderHook(() =>
      useCreateVehicle({ isEdit: true, vehicle: existingVehicle })
    );
    expect(result.current.form.getValues("name")).toBe("Corolla");
    expect(result.current.form.getValues("model")).toBe("Sedan");
    expect(result.current.form.getValues("year")).toBe(2020);
    expect(result.current.form.getValues("isMain")).toBe(true);
  });

  it("onSubmit editar exitoso: llama a updateVehicle, toast de éxito y navega", async () => {
    vi.mocked(services.updateVehicle).mockResolvedValue({ isSuccess: true, data: existingVehicle });

    const { result } = renderHook(() =>
      useCreateVehicle({ isEdit: true, vehicle: existingVehicle })
    );

    await act(async () => {
      await result.current.onSubmit({ name: "Corolla Actualizado", isMain: true });
    });

    expect(services.updateVehicle).toHaveBeenCalledWith(
      "vehicle-1",
      expect.objectContaining({ name: "Corolla Actualizado" })
    );
    expect(mockToast.success).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/vehicle");
  });

  it("onSubmit editar fallido: muestra toast de error y no navega", async () => {
    vi.mocked(services.updateVehicle).mockResolvedValue({ isSuccess: false });

    const { result } = renderHook(() =>
      useCreateVehicle({ isEdit: true, vehicle: existingVehicle })
    );

    await act(async () => {
      await result.current.onSubmit({ name: "Corolla", isMain: true });
    });

    expect(mockToast.error).toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
