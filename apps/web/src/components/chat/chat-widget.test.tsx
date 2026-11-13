import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ChatWidget } from "./chat-widget";

const { postJsonMock } = vi.hoisted(() => ({ postJsonMock: vi.fn() }));

vi.mock("@/lib/api", async () => {
  const actual = await vi.importActual<typeof import("@/lib/api")>("@/lib/api");
  return { ...actual, postJson: postJsonMock };
});

describe("ChatWidget", () => {
  beforeEach(() => {
    postJsonMock.mockReset();
  });

  it("opens, sends a suggested question and shows the provider reply", async () => {
    postJsonMock.mockResolvedValue({
      data: { reply: "We build websites, storefronts and applications." },
    });

    const user = userEvent.setup();
    render(<ChatWidget />);

    await user.click(screen.getByRole("button", { name: /open assistant/i }));

    expect(
      screen.getByText(/I'm the Double Growth assistant/i),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "What services do you offer?" }),
    );

    await waitFor(() => expect(postJsonMock).toHaveBeenCalledTimes(1));
    expect(
      await screen.findByText("We build websites, storefronts and applications."),
    ).toBeInTheDocument();
  });

  it("reports an honest unavailable state when no provider exists", async () => {
    postJsonMock.mockRejectedValue(new Error("AI_NOT_CONFIGURED"));

    const user = userEvent.setup();
    render(<ChatWidget />);

    await user.click(screen.getByRole("button", { name: /open assistant/i }));
    await user.click(
      screen.getByRole("button", { name: "What services do you offer?" }),
    );

    expect(
      await screen.findByText(/No AI provider is configured/i),
    ).toBeInTheDocument();
  });

  it("clears the conversation only after confirmation", async () => {
    postJsonMock.mockResolvedValue({
      data: { reply: "A unique assistant answer for the reset test." },
    });

    const user = userEvent.setup();
    render(<ChatWidget />);

    await user.click(screen.getByRole("button", { name: /open assistant/i }));
    await user.click(
      screen.getByRole("button", { name: "What services do you offer?" }),
    );
    await screen.findByText("A unique assistant answer for the reset test.");

    await user.click(
      screen.getByRole("button", { name: /start a new conversation/i }),
    );

    expect(
      screen.getByRole("heading", { name: "Start a new conversation?" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Keep chat" }));
    expect(
      screen.getByText("A unique assistant answer for the reset test."),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /start a new conversation/i }),
    );
    await user.click(
      screen.getByRole("button", { name: /clear conversation/i }),
    );

    expect(
      screen.queryByText("A unique assistant answer for the reset test."),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Conversation cleared.")).toBeInTheDocument();
  });
});
