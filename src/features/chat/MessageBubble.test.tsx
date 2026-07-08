import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { MessageBubble } from "@/features/chat/MessageBubble";
import type { UIMessage } from "@/lib/types";

describe("MessageBubble", () => {
  it("renders user messages as plain text", () => {
    const msg: UIMessage = { type: "user", text: "What is **SST**?", timestamp: "" };
    render(<MessageBubble message={msg} />);
    // User text is NOT markdown-rendered
    expect(screen.getByText("What is **SST**?")).toBeInTheDocument();
  });

  it("renders bot messages as markdown", () => {
    const msg: UIMessage = {
      type: "bot",
      text: "SST is **sea surface temperature**.",
      timestamp: "",
    };
    render(<MessageBubble message={msg} />);
    expect(screen.getByText("sea surface temperature").tagName).toBe("STRONG");
  });

  it("shows a collapsible sources panel with mode badge", async () => {
    const user = userEvent.setup();
    const msg: UIMessage = {
      type: "bot",
      text: "Answer with sources.",
      timestamp: "",
      mode: "rag",
      sources: [
        { source: "INSAT_3D_ATBD.pdf", content_preview: "preview text here", page: 12 },
        { source: "second_doc.pdf", content_preview: "another preview" },
      ],
    };
    render(<MessageBubble message={msg} />);

    const toggle = screen.getByRole("button", { name: /2 sources/i });
    expect(toggle).toBeInTheDocument();
    expect(screen.queryByText("INSAT_3D_ATBD.pdf")).not.toBeInTheDocument();

    await user.click(toggle);
    expect(screen.getByText("INSAT_3D_ATBD.pdf")).toBeInTheDocument();
    expect(screen.getByText(/p\. 12/)).toBeInTheDocument();
    expect(screen.getByText("Documents")).toBeInTheDocument(); // rag mode badge
  });

  it("renders no sources toggle when there are none", () => {
    const msg: UIMessage = { type: "bot", text: "Plain answer.", timestamp: "" };
    render(<MessageBubble message={msg} />);
    expect(screen.queryByRole("button", { name: /sources/i })).not.toBeInTheDocument();
  });
});
