import { Log } from "./components/LogsPage/Newlogs";

const dateConfig: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3,
    hour12: false,
};

export const getDate = (log: Log) => {
    if (log) {
        let date = new Date(log.timestamp).toLocaleString(undefined, dateConfig);
        return <span className='text-[#5E7BAA]'>{date}</span>;
    } else {
        return <span className='text-[#5E7BAA]'>09/08/2023 10:10</span>;
    }
}

export const bgColor = [
    '75, 192, 192',
    '53, 162, 235',
    '255, 99, 132',
];

export const color = [
    'rgb(75, 192, 192)',
    'rgb(53, 162, 235)',
    'rgb(255, 99, 132)',
];