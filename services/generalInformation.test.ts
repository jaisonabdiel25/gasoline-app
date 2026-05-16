import { describe, it, expect, vi, beforeEach } from "vitest";

const mockPrisma = {
  vehicle: {
    findMany: vi.fn(),
  },
  payment: {
    findMany: vi.fn(),
  },
};

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));

const { getGeneralInformation, getMonthlyVehicleTotals } =
  await import("./generalInformation");

const vehicleWithPayments = {
  id: "vehicle-1",
  name: "Auto",
  model: "Sedan",
  year: 2020,
  userId: "user-1",
  isMain: true,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  payments: [
    { id: "pay-1", amount: 100, userId: "user-1", vehicleId: "vehicle-1", createdAt: new Date(), updatedAt: new Date() },
    { id: "pay-2", amount: 200, userId: "user-1", vehicleId: "vehicle-1", createdAt: new Date(), updatedAt: new Date() },
  ],
};

describe("getGeneralInformation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retorna los vehículos con sus pagos", async () => {
    mockPrisma.vehicle.findMany.mockResolvedValue([vehicleWithPayments]);

    const result = await getGeneralInformation("user-1");

    expect(result.isSuccess).toBe(true);
    expect(result.data).toHaveLength(1);
    expect(result.data![0].payments).toHaveLength(2);
  });

  it("busca vehículos por userId", async () => {
    mockPrisma.vehicle.findMany.mockResolvedValue([]);

    await getGeneralInformation("user-42");

    expect(mockPrisma.vehicle.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { userId: "user-42" } })
    );
  });

  it("retorna array vacío si el usuario no tiene vehículos", async () => {
    mockPrisma.vehicle.findMany.mockResolvedValue([]);

    const result = await getGeneralInformation("user-1");

    expect(result.isSuccess).toBe(true);
    expect(result.data).toHaveLength(0);
  });

  it("incluye los pagos en la consulta", async () => {
    mockPrisma.vehicle.findMany.mockResolvedValue([vehicleWithPayments]);

    await getGeneralInformation("user-1");

    expect(mockPrisma.vehicle.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ include: { payments: true } })
    );
  });
});

describe("getMonthlyVehicleTotals", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const paymentWithVehicle = {
    id: "pay-1",
    amount: 150,
    userId: "user-1",
    vehicleId: "vehicle-1",
    createdAt: new Date(),
    updatedAt: new Date(),
    vehicle: vehicleWithPayments,
  };

  it("retorna los pagos con su vehículo relacionado", async () => {
    mockPrisma.payment.findMany.mockResolvedValue([paymentWithVehicle]);

    const result = await getMonthlyVehicleTotals("user-1");

    expect(result).toHaveLength(1);
    expect(result[0].vehicle).toBeDefined();
  });

  it("busca pagos por userId", async () => {
    mockPrisma.payment.findMany.mockResolvedValue([]);

    await getMonthlyVehicleTotals("user-42");

    expect(mockPrisma.payment.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { userId: "user-42" } })
    );
  });

  it("incluye vehículo en la consulta", async () => {
    mockPrisma.payment.findMany.mockResolvedValue([]);

    await getMonthlyVehicleTotals("user-1");

    expect(mockPrisma.payment.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ include: { vehicle: true } })
    );
  });

  it("ordena por createdAt ascendente", async () => {
    mockPrisma.payment.findMany.mockResolvedValue([]);

    await getMonthlyVehicleTotals("user-1");

    expect(mockPrisma.payment.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ orderBy: { createdAt: "asc" } })
    );
  });

  it("retorna array vacío si no hay pagos", async () => {
    mockPrisma.payment.findMany.mockResolvedValue([]);

    const result = await getMonthlyVehicleTotals("user-1");

    expect(result).toHaveLength(0);
  });
});
