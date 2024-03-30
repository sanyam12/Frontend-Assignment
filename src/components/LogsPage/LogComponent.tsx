import { getDate } from "../../constants";
import { Log } from "./Newlogs";
import PropTypes from 'prop-types';

interface LogType {
    log: Log;
}

export const LogComponent: React.FC<LogType> = (props) => {

    const getColoredType = (log: Log) => {
        if (log.type === 1) {
            return <div className='border-l-4 border-green-500 mr-3'></div>;
        } else if (log.type === 2) {
            return <div className='border-l-4 border-red-500 mr-3'></div>;
        } else {
            return <div className='border-l-4 border-blue-500 mr-3'></div>;
        }
    }

    const getType = (log: Log) => {
        let string = "";
        let colorClass;
        if (log.type === 0) {
            string = '[info]';
            colorClass = "#5E7BAA";
        } else if (log.type === 1) {
            string = '[success]';
            colorClass = "#27AE60";
        } else if (log.type === 2) {
            string = '[error]';
            colorClass = "#fe0606";
        } else {
            string = "";
            colorClass = "#5E7BAA";
        }
        return <span style={{ color: colorClass }}>{string}</span>;
    }

    return (
        <div className='flex px-5 py-2'>
            {getColoredType(props.log)}
            <p className='text-[#A8C3E8] text-transform: none;'>
                {getDate(props.log)}
                &nbsp;&nbsp;
                {getType(props.log).props.children ? (
                    <>{getType(props.log)} &nbsp; {props.log.message}</>
                ) : (
                    <>{props.log.message}</>
                )}
            </p>
        </div>
    );
}


LogComponent.propTypes = {
    log: PropTypes.shape({
        timestamp: PropTypes.number.isRequired,
        message: PropTypes.string.isRequired,
        type: PropTypes.number.isRequired,
    }).isRequired,
}