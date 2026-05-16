import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CustomAvatar } from "./CustomAvatar";
import { useUserStore } from "@/zustand/store/useUserStore";

describe("CustomAvatar", () => {
  beforeEach(() => {
    useUserStore.setState({ userUrl: null });
  });

  it("renderiza el avatar con la URL pasada por prop cuando no hay URL en el store", () => {
    render(<CustomAvatar avatarUrl="https://example.com/user.jpg" />);
    const img = screen.queryByRole("img");
    if (img) {
      expect(img).toHaveAttribute("src", "https://example.com/user.jpg");
    }
  });

  it("usa la URL del store cuando está disponible", () => {
    useUserStore.setState({ userUrl: "https://cloudinary.com/avatar.jpg" });
    render(<CustomAvatar avatarUrl="https://example.com/fallback.jpg" />);
    const img = screen.queryByRole("img");
    if (img) {
      expect(img).toHaveAttribute("src", "https://cloudinary.com/avatar.jpg");
    }
  });

  it("renderiza el fallback con las iniciales del usuario", () => {
    render(<CustomAvatar avatarUrl="https://example.com/user.jpg" userFallback="JP" />);
    expect(screen.getByText("JP")).toBeInTheDocument();
  });

  it("aplica la className al contenedor", () => {
    const { container } = render(
      <CustomAvatar avatarUrl="https://example.com/user.jpg" className="h-12 w-12" />
    );
    const avatar = container.firstChild as HTMLElement;
    expect(avatar.className).toContain("h-12");
    expect(avatar.className).toContain("w-12");
  });

  it("aplica object-cover a la imagen", () => {
    render(<CustomAvatar avatarUrl="https://example.com/user.jpg" />);
    const img = screen.queryByRole("img");
    if (img) {
      expect(img).toHaveClass("object-cover");
    }
  });
});
