import { describe, it, expect, vi, beforeEach } from "vitest";

const mockPrisma = {
  user: {
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
};

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));
vi.mock("bcrypt", () => ({
  default: {
    hash: vi.fn().mockResolvedValue("hashed_password"),
  },
}));

const { registerUser, updateUser, updateImageUser } = await import("./user");

const validUser = {
  name: "Juan",
  email: "juan@example.com",
  password: "Password1",
  passwordConfirm: "Password1",
};

const createdUser = {
  id: "user-1",
  name: "Juan",
  email: "juan@example.com",
  createdAt: new Date(),
};

describe("registerUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("crea un usuario correctamente cuando el email no existe", async () => {
    mockPrisma.user.findMany.mockResolvedValue([]);
    mockPrisma.user.create.mockResolvedValue(createdUser);

    const result = await registerUser(validUser);

    expect(result.isSuccess).toBe(true);
    expect(result.data).toEqual(createdUser);
  });

  it("retorna error si el email ya existe", async () => {
    mockPrisma.user.findMany.mockResolvedValue([createdUser]);

    const result = await registerUser(validUser);

    expect(result.isSuccess).toBe(false);
    expect(result.errors).toContain("Error al crear usuario");
  });

  it("llama a bcrypt.hash con la contraseña", async () => {
    const bcrypt = await import("bcrypt");
    mockPrisma.user.findMany.mockResolvedValue([]);
    mockPrisma.user.create.mockResolvedValue(createdUser);

    await registerUser(validUser);

    expect(bcrypt.default.hash).toHaveBeenCalledWith("Password1", 10);
  });

  it("retorna error si create lanza excepción", async () => {
    mockPrisma.user.findMany.mockResolvedValue([]);
    mockPrisma.user.create.mockRejectedValue(new Error("DB error"));

    const result = await registerUser(validUser);

    expect(result.isSuccess).toBe(false);
  });
});

describe("updateUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("actualiza el nombre del usuario correctamente", async () => {
    mockPrisma.user.update.mockResolvedValue({ ...createdUser, name: "Nuevo" });

    const result = await updateUser("user-1", { ...validUser, name: "Nuevo" });

    expect(result.isSuccess).toBe(true);
    expect(mockPrisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: "user-1" } })
    );
  });

  it("retorna error si update lanza excepción", async () => {
    mockPrisma.user.update.mockRejectedValue(new Error("DB error"));

    const result = await updateUser("user-1", validUser);

    expect(result.isSuccess).toBe(false);
    expect(result.errors).toContain("Error al actualizar usuario");
  });
});

describe("updateImageUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("actualiza la imagen del usuario correctamente", async () => {
    mockPrisma.user.update.mockResolvedValue({ ...createdUser, image: "https://img.jpg" });

    const result = await updateImageUser("user-1", "https://img.jpg");

    expect(result.isSuccess).toBe(true);
    expect(mockPrisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "user-1" },
        data: { image: "https://img.jpg" },
      })
    );
  });

  it("retorna error si update lanza excepción", async () => {
    mockPrisma.user.update.mockRejectedValue(new Error("DB error"));

    const result = await updateImageUser("user-1", "https://img.jpg");

    expect(result.isSuccess).toBe(false);
  });
});
