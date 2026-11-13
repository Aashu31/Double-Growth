import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "./contact-form";

const { postJsonMock } = vi.hoisted(() => ({ postJsonMock: vi.fn() }));

vi.mock("@/lib/api", async () => {
  const actual = await vi.importActual<typeof import("@/lib/api")>("@/lib/api");
  return { ...actual, postJson: postJsonMock };
});

describe("ContactForm", () => {
  beforeEach(() => {
    postJsonMock.mockReset();
  });

  it("blocks submission and shows inline errors for an empty form", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    expect(
      screen.getByText("Please correct the highlighted fields."),
    ).toBeInTheDocument();
    expect(screen.getByText("Enter your full name.")).toBeInTheDocument();
    expect(postJsonMock).not.toHaveBeenCalled();
    expect(
      screen.queryByText("Your enquiry has been received."),
    ).not.toBeInTheDocument();
  });

  it("submits valid details and only shows success after the API accepts", async () => {
    postJsonMock.mockResolvedValue({
      data: { id: "lead_test_1", receivedAt: new Date().toISOString() },
    });

    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/full name/i), "Riya Sharma");
    await user.type(
      screen.getByRole("textbox", { name: /^email/i }),
      "riya@example.com",
    );
    await user.type(
      screen.getByRole("textbox", { name: /^phone/i }),
      "9876543210",
    );
    await user.selectOptions(
      screen.getByLabelText(/service required/i),
      "business-website",
    );
    await user.type(
      screen.getByLabelText(/project description/i),
      "We need a five page business website with an enquiry form for our studio.",
    );
    await user.click(screen.getByRole("checkbox"));

    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    await waitFor(() => expect(postJsonMock).toHaveBeenCalledTimes(1));

    const [path, payload] = postJsonMock.mock.calls[0] as [
      string,
      { email: string; consent: boolean },
    ];
    expect(path).toBe("/api/v1/leads");
    expect(payload.email).toBe("riya@example.com");
    expect(payload.consent).toBe(true);

    expect(
      await screen.findByText("Your enquiry has been received."),
    ).toBeInTheDocument();
    expect(screen.getByText("lead_test_1")).toBeInTheDocument();
  });

  it("shows the backend message and no success state when the API rejects", async () => {
    postJsonMock.mockRejectedValue(
      new Error("The enquiry service is not configured."),
    );

    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/full name/i), "Riya Sharma");
    await user.type(
      screen.getByRole("textbox", { name: /^email/i }),
      "riya@example.com",
    );
    await user.type(
      screen.getByRole("textbox", { name: /^phone/i }),
      "9876543210",
    );
    await user.selectOptions(
      screen.getByLabelText(/service required/i),
      "business-website",
    );
    await user.type(
      screen.getByLabelText(/project description/i),
      "We need a five page business website with an enquiry form for our studio.",
    );
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    expect(
      await screen.findByText(
        "Something went wrong while sending your enquiry. Nothing was stored.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Your enquiry has been received."),
    ).not.toBeInTheDocument();
  });
});
