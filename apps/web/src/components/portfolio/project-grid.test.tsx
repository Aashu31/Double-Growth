import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { projects } from "@/content/portfolio";
import { ProjectGrid } from "./project-grid";

describe("ProjectGrid", () => {
  it("renders all projects and filters by category", async () => {
    const user = userEvent.setup();
    render(<ProjectGrid projects={projects} />);

    expect(screen.getAllByRole("article")).toHaveLength(projects.length);
    expect(
      screen.getByText(`Showing ${projects.length} of ${projects.length} projects`),
    ).toBeInTheDocument();

    const commerce = screen.getByRole("button", { name: /^Commerce/ });
    await user.click(commerce);

    expect(commerce).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(
      screen.getByRole("heading", { name: "Interior Studio Storefront" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Showing 1 of 3 projects")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /^All/ }));

    expect(screen.getAllByRole("article")).toHaveLength(projects.length);
    expect(screen.getByText("Showing 3 of 3 projects")).toBeInTheDocument();
  });
});
