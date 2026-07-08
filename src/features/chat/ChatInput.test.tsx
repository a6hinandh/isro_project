import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ChatInput } from "@/features/chat/ChatInput";

describe("ChatInput", () => {
  it("sends on Enter and clears the input", async () => {
    const user = userEvent.setup();
    const onSend = vi.fn();
    render(<ChatInput onSend={onSend} loading={false} maxLength={4000} />);

    const input = screen.getByLabelText("Message");
    await user.type(input, "what is INSAT-3D?{Enter}");

    expect(onSend).toHaveBeenCalledWith("what is INSAT-3D?", null);
    expect(input).toHaveValue("");
  });

  it("disables send for empty input", () => {
    render(<ChatInput onSend={vi.fn()} loading={false} maxLength={4000} />);
    expect(screen.getByRole("button", { name: "Send message" })).toBeDisabled();
  });

  it("disables send while loading", async () => {
    const user = userEvent.setup();
    render(<ChatInput onSend={vi.fn()} loading={true} maxLength={4000} />);
    await user.type(screen.getByLabelText("Message"), "hello");
    expect(screen.getByRole("button", { name: "Send message" })).toBeDisabled();
  });

  it("does not send on Enter while loading", async () => {
    const user = userEvent.setup();
    const onSend = vi.fn();
    render(<ChatInput onSend={onSend} loading={true} maxLength={4000} />);
    await user.type(screen.getByLabelText("Message"), "hello{Enter}");
    expect(onSend).not.toHaveBeenCalled();
  });

  it("prefills from initialValue", () => {
    render(
      <ChatInput onSend={vi.fn()} loading={false} maxLength={4000} initialValue="Tell me about SARAL" />,
    );
    expect(screen.getByLabelText("Message")).toHaveValue("Tell me about SARAL");
  });
});
