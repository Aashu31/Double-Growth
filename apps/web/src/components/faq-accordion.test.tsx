import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { faqs } from "@/content/faqs";
import { FaqAccordion } from "./faq-accordion";

const items = faqs.slice(0, 2);

describe("FaqAccordion", () => {
  it("renders every question as a native details/summary disclosure", () => {
    const { container } = render(<FaqAccordion items={items} />);

    expect(container.querySelectorAll("details")).toHaveLength(items.length);
    expect(container.querySelectorAll("summary")).toHaveLength(items.length);

    for (const item of items) {
      expect(screen.getByText(item.question)).toBeInTheDocument();
    }
  });

  it("opens and closes a question when its summary is activated", async () => {
    const user = userEvent.setup();
    const { container } = render(<FaqAccordion items={items} />);

    const first = container.querySelector("details");
    const firstItem = items[0];

    if (!first || !firstItem) throw new Error("Expected a FAQ item");

    expect(first.open).toBe(false);

    await user.click(screen.getByText(firstItem.question));
    expect(first.open).toBe(true);

    await user.click(screen.getByText(firstItem.question));
    expect(first.open).toBe(false);
  });
});
