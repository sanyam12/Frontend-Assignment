import React, { useEffect, useState, useRef } from 'react';
import { MimicLogs } from '../../api-mimic';
import { LogComponent } from './LogComponent';
import { getDate } from '../../constants';
import LoadingComponent from './LoadingComponent';
import { UnreadButton } from './UnreadButton';
import Header from '../header/Header';

export interface Log {
  timestamp: number;
  message: string;
  type: number;
}

function Logs() {
  const [logs, setLogs] = useState<Log[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [loadingRef, setLoadingRef] = useState<HTMLDivElement | null>(null);
  const [array, setArray] = useState<Log[]>(logs);
  const [flag, setFlag] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const unsubscribe = MimicLogs.subscribeToLiveLogs((nextLog: Log) => {
      setLogs((prevLogs) => [...prevLogs, nextLog]);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading) {
        loadPreviousLogs();
      }
    }, options);

    if (loadingRef) {
      observer.observe(loadingRef);
    }

    return () => {
      if (loadingRef) {
        observer.unobserve(loadingRef);
      }
    };
  }, [loadingRef, loading]);

  useEffect(() => {
    if (flag === true) {
      setArray([...logs]);
    }
    else {
      setCount(count + 1);
    }
  }, [logs])

  function filterArray(e: React.ChangeEvent<HTMLSelectElement>) {
    setFlag(false);
    let timeRangeInMilliseconds = 0;
    switch (e.target.value) {
      case 'Select Time Range':
        timeRangeInMilliseconds = 60 * 1000;
        break;
      case 'Last 2 minutes':
        timeRangeInMilliseconds = 2 * 60 * 1000;
        break;
      case 'Last 5 minutes':
        timeRangeInMilliseconds = 2 * 60 * 1000;
        break;
      case 'Last 15 minutes':
        timeRangeInMilliseconds = 2 * 60 * 1000;
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
    const currentTime = new Date().getTime();
    const filteredLogs = logs.filter(log => {
      const logTime = new Date(log.timestamp).getTime();
      return (currentTime - logTime) <= timeRangeInMilliseconds;
    });
    setArray(filteredLogs);
  }

  function scrollToBottom() {
    setCount(0);
    setFlag(true);
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  const loadPreviousLogs = () => {
    setLoading(true);
    const endTs = ((array.length === 0) ? Date.now() : array[0].timestamp) - (60 * 60 * 1000);
    const startTs = (array.length === 0) ? Date.now() : array[0].timestamp;
    const limit = 10;

    MimicLogs.fetchPreviousLogs(startTs, endTs, limit)
      .then((fetchedLogs) => {
        setLogs((prevLogs) => [...fetchedLogs, ...prevLogs]);
      })
      .catch((error) => {
        console.error('Error fetching logs:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="App">
      <Header screen={"Logs"} onChange={filterArray}></Header>
      <div className='w-full h-[92vh] flex flex-col px-5'>
        <p className='text-end flex-none h-[24px] text-[2vh]'>Showing logs for {getDate(array[0])} &rarr; {getDate(array[array.length - 1])}</p>
        <div className='bg-[#0E1623] h-[83vh] rounded-lg pb-10 overflow-auto whitespace-nowrap no-scrollbar'>
          <LoadingComponent loading={loading} color='white' />
          {array.map((log, index) => (
            <LogComponent key={index} log={log} />
          ))}
          <UnreadButton title='Unread' count={count} scrollToBottom={scrollToBottom} />
          <div ref={containerRef} style={{ height: '1px', overflowY: 'auto' }}></div>
          <div ref={setLoadingRef}></div>
        </div>
      </div>
    </div>
  );
}

export default Logs;