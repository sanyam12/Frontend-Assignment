import React, { useEffect, useState } from 'react';
import logo from '../../TFlogo.svg';
import NavTab from '../../NavTab';
import selectedMetrics from '../../metrics.png';
import unselectedMetrics from '../../metrics-gray.png';
import selectedList from '../../list-active.png';
import unselectedList from '../../list.png';
import { useNavigate } from 'react-router';


export default function Header(props: any) {
    const [selectedTab, setSelectedTab] = useState(props.screen);
    const navigate = useNavigate();
    const handleMetricsClick = () => {
        setSelectedTab('Metrics');
        navigate('/metrices');
    };

    const handleLogsClick = () => {
        setSelectedTab('Logs');
        navigate('/logs');
    };
    return (
        <>
            <header className="App-header">
                <div className='flex justify-between my-5'>
                    <div className='flex'>
                        <img src={logo} alt='logo' className='h-[33.75px] pe-10'></img>
                        <div className='flex'>
                            <div onClick={handleMetricsClick}>
                                <NavTab
                                    selectedLogo={selectedMetrics}
                                    unselectedLogo={unselectedMetrics}
                                    title='Metrics'
                                    isSelected={selectedTab === 'Metrics'}

                                />
                            </div>
                            <div onClick={handleLogsClick}>
                                <NavTab
                                    selectedLogo={selectedList}
                                    unselectedLogo={unselectedList}
                                    title='Logs'
                                    isSelected={selectedTab === 'Logs'}
                                />
                            </div>
                        </div>
                    </div>
                        <select className='border border-blue-100 h-10 my-auto mr-10' onChange={props.onChange} >
                            <option>Select Time Range</option>
                            <option>Last 2 minutes</option>
                            <option>Last 5 minutes</option>
                            <option>Last 15 minutes</option>
                            <option>Last 30 minutes</option>
                            <option>Last 1 hour</option>
                            <option>Last 3 hour</option>
                            <option>Last 6 hour</option>
                        </select>
                </div>
            </header>
        </>
    )
}