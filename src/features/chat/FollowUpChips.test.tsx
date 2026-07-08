import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FollowUpChips } from "@/features/chat/FollowUpChips";

describe("FollowUpChips", () => {
  it("renders nothing when there are no suggestions", () => {
    const { container } = render(<FollowUpChips suggestions={[]} onSelect={vi.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders a chip per suggestion and fires onSelect", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <FollowUpChips
        suggestions={["What is SST?", "Which satellites observe rainfall?"]}
        onSelect={onSelect}
      />,
    );

    expect(screen.getAllByRole("button")).toHaveLength(2);
    await user.click(screen.getByRole("button", { name: "What is SST?" }));
    expect(onSelect).toHaveBeenCalledWith("What is SST?");
  });

  it("disables chips when disabled", () => {
    render(<FollowUpChips suggestions={["One?"]} onSelect={vi.fn()} disabled />);
    expect(screen.getByRole("button", { name: "One?" })).toBeDisabled();
  });
});
