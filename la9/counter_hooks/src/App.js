import { useState, useEffect } from 'react';
import './App.css';

function CounterPlayground() {
  const [count, setCount] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [logs, setLogs] = useState([]);

  // useEffect to log when component mounts
  useEffect(() => {
    const mountMessage = 'MOUNT: Component Loaded';
    console.log(mountMessage);
    setLogs(prev => [...prev, { type: 'mount', message: mountMessage }]);
  }, []);

  // useEffect to log count value whenever it changes
  useEffect(() => {
    if (count !== undefined) {
      const updateMessage = `UPDATE: count changed to ${count}`;
      console.log(updateMessage);
      setLogs(prev => [...prev, { type: 'update', message: updateMessage }]);
    }
  }, [count]);

  // useEffect to log clicks value whenever it changes
  useEffect(() => {
    const clicksMessage = `UPDATE: clicks changed to ${clicks}`;
    console.log(clicksMessage);
    setLogs(prev => [...prev, { type: 'clicks', message: clicksMessage }]);
  }, [clicks]);

  // useEffect with cleanup function to log when component unmounts
  useEffect(() => {
    return () => {
      const unmountMessage = 'UNMOUNT: Component Unloaded';
      console.log(unmountMessage);
    };
  }, []);

  const handleIncreaseCount = () => {
    setCount(prev => prev + 1);
  };

  const handleExtraClicks = () => {
    setClicks(prev => prev + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Lab - Hooks & Life Cycle created by kashif khan</h1>
      </header>
      <main className="App-main">
        <div className="playground-card">
          <h2 className="playground-title">Lifecycle Playground</h2>
          <div className="counter-display">
            Count: {count}
          </div>
          <div className="button-group">
            <button className="btn btn-primary" onClick={handleIncreaseCount}>
              Increase Count
            </button>
            <button className="btn btn-success" onClick={handleExtraClicks}>
              Extra Clicks
            </button>
          </div>
          <div className="console-output">
            {logs.map((log, index) => (
              <div key={index} className={`log-entry log-${log.type}`}>
                {log.type === 'mount' && <span className="log-icon">★</span>}
                {log.type === 'update' && <span className="log-icon">■</span>}
                {log.type === 'clicks' && <span className="log-icon">●</span>}
                <span className="log-message">{log.message}</span>
              </div>
            ))}
          </div>
          <button className="btn btn-secondary" onClick={() => window.history.back()}>
            Go Back Home
          </button>
        </div>
      </main>
      <footer className="App-footer">
        <p>© 2025 React Lab. All Rights Reserved.Created BY kashif khan</p>
      </footer>
    </div>
  );
}

export default CounterPlayground;
