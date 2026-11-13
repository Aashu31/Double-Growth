import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Header } from "./header";

vi.mock("next/navigation", () => ({
  usePathname: () => "/services",
}));

describe("Header", () => {
  it("marks the active route and opens the mobile navigation", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const primary = screen.getByRole("navigation", { name: "Primary" });
    expect(
      within(primary).getByRole("link", { name: "Services" }),
    ).toHaveAttribute("aria-current", "page");

    const toggle = screen.getByRole("button", {
      name: /open navigation menu/i,
    });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);

    const mobile = screen.getByRole("navigation", { name: "Mobile" });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(
      within(mobile).getByRole("link", { name: "Pricing" }),
    ).toBeInTheDocument();
    expect(
      within(mobile).getByRole("link", { name: "Contact" }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /close navigation menu/i }),
    );

    expect(
      screen.queryByRole("navigation", { name: "Mobile" }),
    ).not.toBeInTheDocument();
  });
});
