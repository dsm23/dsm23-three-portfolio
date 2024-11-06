import { fn } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from ".";

const meta = {
  title: "Components/Shadcn/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: {
    variant: "default",
    children: "Button",
    size: "lg",
    onClick: fn(),
  },
  argTypes: {
    variant: {
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      control: { type: "select" },
    },
    size: {
      options: ["default", "sm", "lg", "icon"],
      control: { type: "select" },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (args) => <Button {...args} />,
};

export default meta;
