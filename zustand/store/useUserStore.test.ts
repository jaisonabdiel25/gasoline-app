import { describe, it, expect, beforeEach } from "vitest";
import { useUserStore } from "./useUserStore";

describe("useUserStore", () => {
  beforeEach(() => {
    useUserStore.setState({ userUrl: null });
  });

  it("tiene userUrl como null por defecto", () => {
    expect(useUserStore.getState().userUrl).toBeNull();
  });

  it("actualiza userUrl con setImageUrl", () => {
    useUserStore.getState().setImageUrl("https://example.com/avatar.jpg");
    expect(useUserStore.getState().userUrl).toBe("https://example.com/avatar.jpg");
  });

  it("actualiza userUrl con una nueva URL", () => {
    useUserStore.getState().setImageUrl("https://cloudinary.com/old.jpg");
    useUserStore.getState().setImageUrl("https://cloudinary.com/new.jpg");
    expect(useUserStore.getState().userUrl).toBe("https://cloudinary.com/new.jpg");
  });

  it("expone setImageUrl como función", () => {
    expect(typeof useUserStore.getState().setImageUrl).toBe("function");
  });
});
