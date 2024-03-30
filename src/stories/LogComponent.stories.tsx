import type { Meta, StoryObj } from '@storybook/react';
import { LogComponent } from '../components/LogsPage/LogComponent';

const meta:Meta<typeof LogComponent> = {
    title: "LogComponent",
    component: LogComponent,
}

export default meta;
type Story = StoryObj<typeof LogComponent>;

export const Loading:Story = {
    args: {
        log: {
            type: 1,
            message: "This is a success message",
            timestamp: 1633574400000
        }
    }
}