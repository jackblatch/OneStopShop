import type { Meta, StoryObj } from "@storybook/react";

import { Heading } from "../components/ui/heading";

const meta: Meta<typeof Heading> = {
  title: "Primitives/Heading",
  component: Heading,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const H1: Story = {
  args: {
    children: "Heading 1",
    size: "h1",
  },
};

export const H2: Story = {
  args: {
    children: "Heading 2",
    size: "h2",
  },
};

export const H3: Story = {
  args: {
    children: "Heading 3",
    size: "h3",
  },
};

export const H4: Story = {
  args: {
    children: "Heading 4",
    size: "h4",
  },
};
