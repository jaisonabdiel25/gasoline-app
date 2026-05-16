import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CustomEmpty } from "./CustomEmpty";

const mockPush = vi.fn();
const mockReplace = vi.fn();
const mockRefresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, replace: mockReplace, refresh: mockRefresh }),
  usePathname: () => "/payment",
}));

describe("CustomEmpty", () => {
  it("renderiza el título correctamente", () => {
    render(
      <CustomEmpty
        title="Sin pagos"
        description="No tienes pagos registrados"
        labelButton="Crear pago"
      />
    );
    expect(screen.getByText("Sin pagos")).toBeInTheDocument();
  });

  it("renderiza la descripción correctamente", () => {
    render(
      <CustomEmpty
        title="Sin pagos"
        description="No tienes pagos registrados"
        labelButton="Crear pago"
      />
    );
    expect(screen.getByText("No tienes pagos registrados")).toBeInTheDocument();
  });

  it("renderiza el label del botón correctamente", () => {
    render(
      <CustomEmpty
        title="Sin pagos"
        description="No tienes pagos registrados"
        labelButton="Crear pago"
      />
    );
    expect(screen.getByText("Crear pago")).toBeInTheDocument();
  });

  it("navega a la ruta indicada al hacer click si se pasa route", () => {
    render(
      <CustomEmpty
        title="Sin pagos"
        description="desc"
        labelButton="Crear"
        route="/payment/new"
      />
    );
    fireEvent.click(screen.getByText("Crear"));
    expect(mockPush).toHaveBeenCalledWith("/payment/new");
  });

  it("llama a replace y refresh al hacer click si resetparams=true", () => {
    render(
      <CustomEmpty
        title="Sin pagos"
        description="desc"
        labelButton="Limpiar filtros"
        resetparams
      />
    );
    fireEvent.click(screen.getByText("Limpiar filtros"));
    expect(mockReplace).toHaveBeenCalledWith("/payment");
    expect(mockRefresh).toHaveBeenCalled();
  });

  it("renderiza el ícono Wind", () => {
    render(
      <CustomEmpty
        title="Sin pagos"
        description="desc"
        labelButton="Crear"
      />
    );
    const icon = document.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });
});
