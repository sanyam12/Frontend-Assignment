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
    ScriptableContext
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { bgColor } from '../../constants';
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

interface ChartViewProps {
    item: {
        options: any,
        data: any,
    },
    gradient:boolean
}


const ChartView: React.FC<ChartViewProps> = (props) => {


    const getGradient = (data: any) => {
        if (!props.gradient) return data;
        console.log("gradient");
        for (let i = 0; i < data["datasets"].length; i++) {
            if(i===0){
                data["datasets"][i]["fill"] = '+1';
            }else{
                data["datasets"][i]["fill"] = true;
            }
            data["datasets"][i]["backgroundColor"] = (context: ScriptableContext<"line">) => {
                const ctx = context.chart.ctx;
                const chart = context.chart;
                if(chart && chart.chartArea){
                    const gradient = ctx.createLinearGradient(0, chart.chartArea.top, 0, chart.chartArea.bottom);
                    gradient.addColorStop(0, "rgba(" + bgColor[i + bgColor.length - data["datasets"].length] + ",1)");
                    gradient.addColorStop(1, "rgba(" + bgColor[i + bgColor.length - data["datasets"].length] + ",0)");
                    return gradient;
                }
            }
        }
        return data;
    }

    return (
        <div className='border border-blue-300 rounded-md mx-2 my-2'>
            <Line options={props.item.options} data={getGradient(props.item.data)} />
        </div>
    );
}

export default ChartView;