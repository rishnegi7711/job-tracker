import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Link, MemoryRouter } from "react-router-dom";
import { AppRoutes } from "./App";

// Pages are stubbed so the test needs no API env; /login is the broken route.
vi.mock("./pages/LoginPage", () => ({
  default: () => {
    throw new Error("boom");
  },
}));
vi.mock("./pages/RegisterPage", () => ({ default: () => <p>register page</p> }));
vi.mock("./pages/BoardView", () => ({ default: () => <p>board</p> }));
vi.mock("./pages/DetailView", () => ({ default: () => <p>detail</p> }));

describe("AppRoutes error boundary", () => {
  it("shows the fallback on a broken route and clears it after navigating away", () => {
    const logged = vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AppRoutes />
        <Link to="/register">go to register</Link>
      </MemoryRouter>,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("link", { name: "go to register" }));

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByText("register page")).toBeInTheDocument();
    logged.mockRestore();
  });
});
