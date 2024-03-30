import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { MimicMetrics } from '../../api-mimic';
import ChartView from './ChartView';
import { bgColor, color } from '../../constants';
import Header from '../header/Header';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);



const getOptions = (title: string) => {
    return {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
                align: 'start' as const,
            },
            title: {
                display: true,
                text: title,
            },
            tooltip: {
                enabled: false
            },
        },
    };
}

const getLabels = (start: number, end: number) => {
    let labels = [];
    for (let i = start; i < end; i += 1000) {
        labels.push(new Date(i).toLocaleTimeString());
    }
    return labels;
}

const convertData = (metrics: any, fill: boolean) => {
    let objects = [];
    for (let i = 0; i < metrics.length; i++) {
        let obj = {
            label: metrics[i]["name"],
            data: metrics[i]["values"].map((value: any) => value["value"] as number),
            borderColor: color[i + bgColor.length - metrics.length],
            backgroundColor: 'rgba(' + bgColor[i] + ' , 0.5)',
            cubicInterpolationMode: 'monotone',
            fill: (fill === true) ? (i !== metrics.length - 1) ? '+1' : 'origin' : false,
        };
        objects.push(obj);
    }
    return objects;
}

const getData = async (startTs: number, endTs: number) => {
    const metrics = await MimicMetrics.fetchMetrics({ startTs: startTs, endTs: endTs });
    const labels = getLabels(startTs, endTs);
    let list = [];
    for (let i = 0; i < metrics.length; i++) {
        list.push({
            options: getOptions(metrics[i]["name"]),
            data: {
                labels: labels,
                datasets: convertData(metrics[i]["graphLines"], false),
            },
        });
    }
    console.log(metrics);
    return list;
}


const Metrics: React.FC = () => {

    const [data, setData] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchDataFromStartTsAndEndTs(6000);
            } catch (error) {
                console.error('Error fetching metrics:', error);
            }
        };

        fetchData();

    }, []);

    const fetchDataFromStartTsAndEndTs = async (timeRangeInMilliseconds: number) => {
        const endTs = new Date().getTime();
        const startTs = endTs - timeRangeInMilliseconds;
        const metrics = await getData(startTs, endTs);
        setData(metrics);
    }

    async function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
        let timeRangeInMilliseconds = 0;
        switch (e.target.value) {
            case 'Select Time Range':
                timeRangeInMilliseconds = 60 * 1000;
                break;
            case 'Last 2 minutes':
                timeRangeInMilliseconds = 2 * 60 * 1000;
                break;
            case 'Last 5 minutes':
                timeRangeInMilliseconds = 5 * 60 * 1000;
                break;
            case 'Last 15 minutes':
                timeRangeInMilliseconds = 15 * 60 * 1000;
                break;
            case 'Last 30 minutes':
                timeRangeInMilliseconds = 30 * 60 * 1000;
                break;
            case 'Last 1 hour':
                timeRangeInMilliseconds = 60 * 60 * 1000;
                break;
            case 'Last 3 hour':
                timeRangeInMilliseconds = 3 * 60 * 60 * 1000;
                break;
            case 'Last 6 hour':
                timeRangeInMilliseconds = 6 * 60 * 60 * 1000;
                break;
            default:
                break;
        }
        await fetchDataFromStartTsAndEndTs(timeRangeInMilliseconds);
    }

    return <>
        <Header screen={"Metrics"} onChange={onChange}></Header>
        <div className='border border-blue-300 w-screen px-5 mx-auto rounded-md' style={{ width: '96%' }}>
            <div className='w-full flex flex-row my-3 '>
                <p className=' text-[3vh] font-bold'>Metrics</p>
                <p className=' text-[2vh] ml-3 mt-2'>{new Date(Date.now() - 6000).toLocaleString()} &rarr; {new Date(Date.now()).toLocaleString()}</p>
            </div>
            <div className='grid grid-cols-2'>
                {data.map((item: any, index: number) => {
                    return <ChartView key={index} item={item} gradient={(index === 3) ? true : false} />
                })}
            </div>
        </div>
    </>
}
export default Metrics;