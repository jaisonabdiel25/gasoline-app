import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CustomDeleteBadge } from "./CustomDeleteBadge";

const mockReplace = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace }),
  useSearchParams: () => new URLSearchParams("startDate=2024-01-01&endDate=2024-01-31"),
  usePathname: () => "/payment",
}));

describe("CustomDeleteBadge", () => {
  beforeEach(() => {
    mockReplace.mockClear();
  });

  it("renderiza el label del badge", () => {
    render(<CustomDeleteBadge label="Enero 2024" param="startDate" />);
    expect(screen.getByText("Enero 2024")).toBeInTheDocument();
  });

  it("renderiza el ícono de cierre", () => {
    render(<CustomDeleteBadge label="Enero 2024" param="startDate" />);
    const icon = document.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("llama a router.replace al hacer click en el ícono", () => {
    render(<CustomDeleteBadge label="Enero 2024" param="startDate" />);
    const icon = document.querySelector("svg")!;
    fireEvent.click(icon);
    expect(mockReplace).toHaveBeenCalled();
  });

  it("elimina el parámetro correcto de la URL al hacer click", () => {
    render(<CustomDeleteBadge label="Enero 2024" param="startDate" />);
    const icon = document.querySelector("svg")!;
    fireEvent.click(icon);
    const callArg = mockReplace.mock.lastCall![0] as string;
    expect(callArg).not.toContain("startDate");
    expect(callArg).toContain("endDate");
  });

  it("genera la URL incluyendo el pathname", () => {
    render(<CustomDeleteBadge label="Enero 2024" param="startDate" />);
    const icon = document.querySelector("svg")!;
    fireEvent.click(icon);
    const callArg = mockReplace.mock.lastCall![0] as string;
    expect(callArg).toContain("/payment");
  });
});
