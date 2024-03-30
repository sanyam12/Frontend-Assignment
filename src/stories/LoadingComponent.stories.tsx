import LoadingComponent from "../components/LogsPage/LoadingComponent";
import type { Meta, StoryObj } from '@storybook/react';

const meta:Meta<typeof LoadingComponent> = {
    title: "LoadingComponent",
    component: LoadingComponent,
}

export default meta;
type Story = StoryObj<typeof LoadingComponent>;

export const Loading:Story = {
    args: {
        loading: true,
        color: 'black',
    }
}