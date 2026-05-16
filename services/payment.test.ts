import { describe, it, expect, vi, beforeEach } from "vitest";
import { createPayment, deletePayments } from "./payment";

const mockFetch = vi.fn();
global.fetch = mockFetch;

const makeJsonResponse = (data: unknown) => ({
  json: () => Promise.resolve(data),
});

describe("createPayment", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  const validPayload = [
    { amount: 100, vehicleId: "vehicle-1", userId: "user-1" },
  ];

  it("llama a fetch con la URL y método correctos", async () => {
    mockFetch.mockResolvedValue(makeJsonResponse({ id: "pay-1" }));
    await createPayment(validPayload);
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/payments",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("envía el body como JSON", async () => {
    mockFetch.mockResolvedValue(makeJsonResponse({ id: "pay-1" }));
    await createPayment(validPayload);
    const [, options] = mockFetch.mock.calls[0];
    expect(options.body).toBe(JSON.stringify(validPayload));
  });

  it("incluye Content-Type en los headers", async () => {
    mockFetch.mockResolvedValue(makeJsonResponse({ id: "pay-1" }));
    await createPayment(validPayload);
    const [, options] = mockFetch.mock.calls[0];
    expect(options.headers["Content-Type"]).toBe("application/json");
  });

  it("retorna isSuccess: true cuando fetch tiene éxito", async () => {
    mockFetch.mockResolvedValue(makeJsonResponse({ id: "pay-1" }));
    const result = await createPayment(validPayload);
    expect(result.isSuccess).toBe(true);
  });

  it("retorna los datos de la respuesta", async () => {
    const responseData = { id: "pay-1", amount: 100 };
    mockFetch.mockResolvedValue(makeJsonResponse(responseData));
    const result = await createPayment(validPayload);
    expect(result.data).toEqual(responseData);
  });

  it("retorna isSuccess: true incluso si fetch falla (comportamiento actual)", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));
    const result = await createPayment(validPayload);
    expect(result.isSuccess).toBe(true);
  });
});

describe("deletePayments", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  const ids = [{ id: "pay-1" }, { id: "pay-2" }];

  it("llama a fetch con método DELETE", async () => {
    mockFetch.mockResolvedValue(makeJsonResponse({ deleted: true }));
    await deletePayments(ids);
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/payments",
      expect.objectContaining({ method: "DELETE" })
    );
  });

  it("envía los ids como JSON en el body", async () => {
    mockFetch.mockResolvedValue(makeJsonResponse({ deleted: true }));
    await deletePayments(ids);
    const [, options] = mockFetch.mock.calls[0];
    expect(options.body).toBe(JSON.stringify(ids));
  });

  it("retorna isSuccess: true cuando fetch tiene éxito", async () => {
    mockFetch.mockResolvedValue(makeJsonResponse({ deleted: true }));
    const result = await deletePayments(ids);
    expect(result.isSuccess).toBe(true);
  });
});
