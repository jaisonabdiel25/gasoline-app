import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCreatePayment } from "./useCreatePayment";
import * as services from "@/services";
import { Vehicle } from "@/interface/vehicle";
import { Payment } from "@/interface/payment";

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
  createPayment: vi.fn(),
}));

const mockVehicles: Vehicle[] = [
  { id: "v1", name: "Auto 1", isMain: true, model: "Sedan", year: 2020, userId: "user-1", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: "v2", name: "Auto 2", isMain: false, model: "SUV", year: 2021, userId: "user-1", isActive: true, createdAt: new Date(), updatedAt: new Date() },
];

const mockPayment: Payment = {
  id: "p1",
  amount: 100,
  vehicleId: "v1",
  userId: "user-1",
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("useCreatePayment", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retorna el formulario y los handlers", () => {
    const { result } = renderHook(() => useCreatePayment({ vehicles: mockVehicles }));
    expect(result.current.form).toBeDefined();
    expect(typeof result.current.onSubmit).toBe("function");
    expect(typeof result.current.handleDiscarted).toBe("function");
  });

  it("pre-selecciona el vehículo principal", () => {
    const { result } = renderHook(() => useCreatePayment({ vehicles: mockVehicles }));
    expect(result.current.form.getValues("vehicleId")).toBe("v1");
  });

  it("no pre-selecciona vehicleId si no hay vehículo principal", () => {
    const vehiclesWithoutMain = mockVehicles.map((v) => ({ ...v, isMain: false }));
    const { result } = renderHook(() =>
      useCreatePayment({ vehicles: vehiclesWithoutMain })
    );
    expect(result.current.form.getValues("vehicleId")).toBeUndefined();
  });

  it("el formulario tiene amount como undefined por defecto", () => {
    const { result } = renderHook(() => useCreatePayment({ vehicles: mockVehicles }));
    expect(result.current.form.getValues("amount")).toBeUndefined();
  });

  it("onSubmit exitoso: llama a createPayment, muestra toast de éxito y navega", async () => {
    vi.mocked(services.createPayment).mockResolvedValue({ isSuccess: true, data: mockPayment });

    const { result } = renderHook(() => useCreatePayment({ vehicles: mockVehicles }));

    await act(async () => {
      await result.current.onSubmit({ amount: 100, vehicleId: "v1" });
    });

    expect(services.createPayment).toHaveBeenCalledWith([
      expect.objectContaining({ amount: 100, vehicleId: "v1", userId: "user-1" }),
    ]);
    expect(mockToast.success).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/payment");
  });

  it("onSubmit fallido: muestra toast de error y no navega", async () => {
    vi.mocked(services.createPayment).mockResolvedValue({ isSuccess: false });

    const { result } = renderHook(() => useCreatePayment({ vehicles: mockVehicles }));

    await act(async () => {
      await result.current.onSubmit({ amount: 50, vehicleId: "v1" });
    });

    expect(mockToast.error).toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("handleDiscarted: resetea el formulario y navega a /payment", async () => {
    const { result } = renderHook(() => useCreatePayment({ vehicles: mockVehicles }));

    act(() => {
      result.current.form.setValue("amount", 200);
    });

    act(() => {
      result.current.handleDiscarted();
    });

    expect(mockPush).toHaveBeenCalledWith("/payment");
    expect(result.current.form.getValues("amount")).toBeUndefined();
  });
});
