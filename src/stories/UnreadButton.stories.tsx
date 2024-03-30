import { UnreadButton } from "../components/LogsPage/UnreadButton";
import type { Meta, StoryObj } from '@storybook/react';

const meta:Meta<typeof UnreadButton> = {
    title: "UnreadButton",
    component: UnreadButton,
}

export default meta;
type Story = StoryObj<typeof UnreadButton>;

export const Unread: Story = {
    args: {
        title: "Unread",
        count: 5,
    }
}