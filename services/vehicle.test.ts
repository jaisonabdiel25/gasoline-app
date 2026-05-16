import { describe, it, expect, vi, beforeEach } from "vitest";

const mockPrisma = {
  vehicle: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    deleteMany: vi.fn(),
  },
};

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));

const { createVehicle, deleteVehicles, getVehicleById, updateVehicle } =
  await import("./vehicle");

const validUuid = "123e4567-e89b-12d3-a456-426614174000";

const vehicleData = {
  id: validUuid,
  name: "Corolla",
  model: "Sedan",
  year: 2020,
  userId: "user-1",
  isMain: false,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("createVehicle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("crea el primer vehículo como principal (isMain=true)", async () => {
    mockPrisma.vehicle.findMany.mockResolvedValue([]);
    mockPrisma.vehicle.create.mockResolvedValue({ ...vehicleData, isMain: true });

    const result = await createVehicle({ name: "Corolla", isMain: false, userId: "user-1" });

    expect(result.isSuccess).toBe(true);
    expect(mockPrisma.vehicle.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ isMain: true }) })
    );
  });

  it("crea vehículo adicional como no principal (isMain=false)", async () => {
    mockPrisma.vehicle.findMany.mockResolvedValue([vehicleData]);
    mockPrisma.vehicle.create.mockResolvedValue({ ...vehicleData, isMain: false });

    const result = await createVehicle({ name: "Yaris", isMain: false, userId: "user-1" });

    expect(result.isSuccess).toBe(true);
    expect(mockPrisma.vehicle.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ isMain: false }) })
    );
  });

  it("retorna error si create retorna null", async () => {
    mockPrisma.vehicle.findMany.mockResolvedValue([]);
    mockPrisma.vehicle.create.mockResolvedValue(null);

    const result = await createVehicle({ name: "Auto", isMain: false, userId: "user-1" });

    expect(result.isSuccess).toBe(false);
  });
});

describe("deleteVehicles", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retorna error si no se encuentran vehículos", async () => {
    mockPrisma.vehicle.findMany.mockResolvedValue([]);
    const result = await deleteVehicles([{ id: validUuid }]);
    expect(result.isSuccess).toBe(false);
    expect(result.errors).toContain("No se encontraron vehículos para eliminar");
  });

  it("retorna error si el vehículo tiene pagos asociados", async () => {
    mockPrisma.vehicle.findMany.mockResolvedValue([
      { ...vehicleData, payments: [{ id: "pay-1", amount: 100 }] },
    ]);
    const result = await deleteVehicles([{ id: validUuid }]);
    expect(result.isSuccess).toBe(false);
    expect(result.errors).toContain(
      "No se pueden eliminar vehículos que tienen pagos asociados"
    );
  });

  it("elimina correctamente vehículos sin pagos", async () => {
    mockPrisma.vehicle.findMany.mockResolvedValue([
      { ...vehicleData, payments: [] },
    ]);
    mockPrisma.vehicle.deleteMany.mockResolvedValue({ count: 1 });

    const result = await deleteVehicles([{ id: validUuid }]);
    expect(result.isSuccess).toBe(true);
    expect(mockPrisma.vehicle.deleteMany).toHaveBeenCalled();
  });
});

describe("getVehicleById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retorna el vehículo si existe", async () => {
    mockPrisma.vehicle.findUnique.mockResolvedValue(vehicleData);
    const result = await getVehicleById(validUuid);
    expect(result.isSuccess).toBe(true);
    expect(result.data).toEqual(vehicleData);
  });

  it("retorna error si el vehículo no existe", async () => {
    mockPrisma.vehicle.findUnique.mockResolvedValue(null);
    const result = await getVehicleById(validUuid);
    expect(result.isSuccess).toBe(false);
    expect(result.errors).toContain("Vehículo no encontrado");
  });
});

describe("updateVehicle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("actualiza el vehículo correctamente", async () => {
    mockPrisma.vehicle.findFirst.mockResolvedValue(null);
    mockPrisma.vehicle.update.mockResolvedValue({ ...vehicleData, name: "Nuevo" });

    const result = await updateVehicle(validUuid, {
      name: "Nuevo",
      isMain: false,
      userId: "user-1",
    });

    expect(result.isSuccess).toBe(true);
  });

  it("actualiza el vehículo principal previo a false si se cambia el principal", async () => {
    const previousMain = { ...vehicleData, id: "other-id", isMain: true };
    mockPrisma.vehicle.findFirst.mockResolvedValue(previousMain);
    mockPrisma.vehicle.update.mockResolvedValue({ ...vehicleData, isMain: true });

    await updateVehicle(validUuid, { name: "Auto", isMain: true, userId: "user-1" });

    expect(mockPrisma.vehicle.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "other-id" },
        data: { isMain: false },
      })
    );
  });
});
