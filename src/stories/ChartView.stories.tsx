import type { Meta, StoryObj } from '@storybook/react';
import ChartView from '../components/metrics/ChartView';

const meta:Meta<typeof ChartView> = {
    title: "ChartView",
    component: ChartView,
}

export default meta;

type Story = StoryObj<typeof ChartView>;
export const Chart:Story = {
    args: {
        item: {
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        align: 'start',
                    },
                    title: {
                        display: true,
                        text: "Title",
                    },
                    tooltip: {
                        enabled: false
                    },
                },
            },
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [
                    {
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }
                ]
            }
        },
        gradient: false
    }
}