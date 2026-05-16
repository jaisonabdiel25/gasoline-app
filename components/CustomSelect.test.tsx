import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CustomSelect } from "./CustomSelect";

const mockData = [
  { id: "1", label: "Toyota Corolla" },
  { id: "2", label: "Honda Civic" },
];

describe("CustomSelect", () => {
  it("renderiza el trigger del select", () => {
    render(
      <CustomSelect data={mockData} onChange={vi.fn()} />
    );
    const trigger = document.querySelector("[role='combobox']");
    expect(trigger).toBeInTheDocument();
  });

  it("muestra el placeholder cuando se pasa", () => {
    render(
      <CustomSelect
        data={mockData}
        onChange={vi.fn()}
        placeholder="Selecciona un auto"
      />
    );
    expect(screen.getByText("Selecciona un auto")).toBeInTheDocument();
  });

  it("aplica la clase correcta al trigger", () => {
    render(
      <CustomSelect
        data={mockData}
        onChange={vi.fn()}
        classname="w-48"
      />
    );
    const trigger = document.querySelector("[role='combobox']");
    expect(trigger).toHaveClass("w-48");
  });

  it("usa clase w-full por defecto", () => {
    render(
      <CustomSelect data={mockData} onChange={vi.fn()} />
    );
    const trigger = document.querySelector("[role='combobox']");
    expect(trigger).toHaveClass("w-full");
  });
});
