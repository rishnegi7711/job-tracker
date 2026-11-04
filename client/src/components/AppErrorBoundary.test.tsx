import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AppErrorBoundary from "./AppErrorBoundary";

const Boom = () => {
  throw new Error("boom");
};

describe("AppErrorBoundary", () => {
  it("renders children when nothing throws", () => {
    render(
      <AppErrorBoundary>
        <p>fine</p>
      </AppErrorBoundary>,
    );
    expect(screen.getByText("fine")).toBeInTheDocument();
  });

  it("shows the fallback and logs when a child throws in render", () => {
    const logged = vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <AppErrorBoundary>
        <Boom />
      </AppErrorBoundary>,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reload" })).toHaveFocus();
    expect(screen.getByRole("link", { name: "Back to the board" })).toHaveAttribute("href", "/");
    expect(logged).toHaveBeenCalled();
    logged.mockRestore();
  });

  it("clears the error when resetKey changes", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { rerender } = render(
      <AppErrorBoundary resetKey="/a">
        <Boom />
      </AppErrorBoundary>,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    rerender(
      <AppErrorBoundary resetKey="/b">
        <p>recovered</p>
      </AppErrorBoundary>,
    );
    expect(screen.getByText("recovered")).toBeInTheDocument();
    vi.restoreAllMocks();
  });
});
