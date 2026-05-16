import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useGeneralInformation } from "./useGeneralInformation";
import { VehicleWithRelations } from "@/interface/vehicle";
import { Payment } from "@/interface/payment";

const makePayment = (amount: number, daysAgo = 0): Payment => ({
  id: crypto.randomUUID(),
  amount,
  userId: "user-1",
  vehicleId: "vehicle-1",
  createdAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
  updatedAt: new Date(),
});

const makeVehicle = (payments: Payment[]): VehicleWithRelations => ({
  id: "vehicle-1",
  name: "Auto",
  model: "Sedan",
  year: 2020,
  userId: "user-1",
  isMain: true,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  payments,
});

describe("useGeneralInformation", () => {
  it("retorna ceros con información vacía", () => {
    const { result } = renderHook(() =>
      useGeneralInformation({ generalInformation: [] })
    );
    expect(result.current.totalPayments).toBe(0);
    expect(result.current.totalAmountPayments).toBe(0);
    expect(result.current.averagePayments).toBe(0);
    expect(result.current.totalAmountCurrentMonth).toBe(0);
  });

  it("calcula el total de pagos correctamente", () => {
    const vehicle = makeVehicle([makePayment(100), makePayment(200)]);
    const { result } = renderHook(() =>
      useGeneralInformation({ generalInformation: [vehicle] })
    );
    expect(result.current.totalPayments).toBe(2);
  });

  it("calcula el monto total correctamente", () => {
    const vehicle = makeVehicle([makePayment(100), makePayment(50)]);
    const { result } = renderHook(() =>
      useGeneralInformation({ generalInformation: [vehicle] })
    );
    expect(result.current.totalAmountPayments).toBe(150);
  });

  it("calcula el promedio de pagos correctamente", () => {
    const vehicle = makeVehicle([makePayment(100), makePayment(200)]);
    const { result } = renderHook(() =>
      useGeneralInformation({ generalInformation: [vehicle] })
    );
    expect(result.current.averagePayments).toBe(150);
  });

  it("calcula el total del mes actual correctamente", () => {
    const vehicle = makeVehicle([
      makePayment(300, 0),
      makePayment(200, 1),
    ]);
    const { result } = renderHook(() =>
      useGeneralInformation({ generalInformation: [vehicle] })
    );
    expect(result.current.totalAmountCurrentMonth).toBe(500);
  });

  it("excluye pagos de meses anteriores del total mensual", () => {
    const vehicle = makeVehicle([
      makePayment(100, 0),
      makePayment(999, 35),
    ]);
    const { result } = renderHook(() =>
      useGeneralInformation({ generalInformation: [vehicle] })
    );
    expect(result.current.totalAmountCurrentMonth).toBe(100);
  });

  it("acumula pagos de múltiples vehículos", () => {
    const vehicle1 = makeVehicle([makePayment(100)]);
    const vehicle2 = { ...makeVehicle([makePayment(200)]), id: "vehicle-2" };
    const { result } = renderHook(() =>
      useGeneralInformation({ generalInformation: [vehicle1, vehicle2] })
    );
    expect(result.current.totalPayments).toBe(2);
    expect(result.current.totalAmountPayments).toBe(300);
  });

  it("calcula promedio cero para vehículo sin pagos", () => {
    const vehicle = makeVehicle([]);
    const { result } = renderHook(() =>
      useGeneralInformation({ generalInformation: [vehicle] })
    );
    expect(result.current.averagePayments).toBe(0);
  });

  it("retorna loading como false siempre", () => {
    const { result } = renderHook(() =>
      useGeneralInformation({ generalInformation: [] })
    );
    expect(result.current.loading).toBe(false);
  });
});
