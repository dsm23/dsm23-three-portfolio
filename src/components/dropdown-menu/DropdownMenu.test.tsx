import type { ReactElement } from "react";
import { DropdownMenuSub } from "@radix-ui/react-dropdown-menu";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Options } from "@testing-library/user-event";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from ".";

const setup = (jsx: ReactElement, opts?: Options) => ({
  user: userEvent.setup(opts),
  // Import `render` from the framework library of your choice.
  // See https://testing-library.com/docs/dom-testing-library/install#wrappers
  ...render(jsx),
});

describe("DropdownMenu components", () => {
  test("renders DropdownMenuTrigger and opens menu on click", async () => {
    const { user } = setup(
      <DropdownMenu>
        <DropdownMenuTrigger>Options</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByText("Options")).toBeInTheDocument();

    await act(async () => {
      await user.click(screen.getByText("Options"));
    });

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  test("renders DropdownMenuCheckboxItem with checked state", async () => {
    const { user } = setup(
      <DropdownMenu>
        <DropdownMenuTrigger>Options</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked>
            Checkbox Item
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await act(async () => {
      await user.click(screen.getByText("Options"));
    });

    const checkboxItem = screen.getByText("Checkbox Item");
    expect(checkboxItem).toBeInTheDocument();
    expect(checkboxItem).toHaveAttribute("aria-checked", "true");
  });

  test("renders DropdownMenuRadioItem with selected state", async () => {
    const { user } = setup(
      <DropdownMenu>
        <DropdownMenuTrigger>Options</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="itemOne">
            <DropdownMenuRadioItem value="itemOne">
              Radio Item
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await act(async () => {
      await user.click(screen.getByText("Options"));
    });

    const radioItem = screen.getByText("Radio Item");
    expect(radioItem).toBeInTheDocument();
    expect(radioItem).toHaveAttribute("aria-checked", "true");
  });

  test("renders DropdownMenuLabel and separator", async () => {
    const { user } = setup(
      <DropdownMenu>
        <DropdownMenuTrigger>Options</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Label</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await act(async () => {
      await user.click(screen.getByText("Options"));
    });

    expect(screen.getByText("Label")).toBeInTheDocument();
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  test("renders DropdownMenuShortcut", async () => {
    const { user } = setup(
      <DropdownMenu>
        <DropdownMenuTrigger>Options</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            Item 1 <DropdownMenuShortcut>⌘+K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await act(async () => {
      await user.click(screen.getByText("Options"));
    });

    expect(screen.getByText("⌘+K")).toBeInTheDocument();
  });

  test("renders DropdownMenuGroup with items", async () => {
    const { user } = setup(
      <DropdownMenu>
        <DropdownMenuTrigger>Options</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>Grouped Item 1</DropdownMenuItem>
            <DropdownMenuItem>Grouped Item 2</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await act(async () => {
      await user.click(screen.getByText("Options"));
    });

    expect(screen.getByText("Grouped Item 1")).toBeInTheDocument();
    expect(screen.getByText("Grouped Item 2")).toBeInTheDocument();
  });

  test("renders DropdownMenuSub with content", async () => {
    const { user } = setup(
      <DropdownMenu>
        <DropdownMenuTrigger>Options</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Second trigger</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <span>Item One</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Item Two</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await act(async () => {
      await user.click(screen.getByText("Options"));
    });

    expect(screen.queryByText("Item One")).not.toBeInTheDocument();
    expect(screen.queryByText("Item Two")).not.toBeInTheDocument();

    await act(async () => {
      await user.click(screen.getByText("Second trigger"));
    });

    expect(screen.getByText("Item One")).toBeInTheDocument();
    expect(screen.getByText("Item Two")).toBeInTheDocument();

    await act(async () => {
      // move cursor away from SubTrigger
      await user.click(screen.getByText("My Account"));
    });

    expect(screen.queryByText("Item One")).not.toBeInTheDocument();
    expect(screen.queryByText("Item Two")).not.toBeInTheDocument();
  });
});
