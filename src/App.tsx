import { Route, Routes, Navigate } from "react-router-dom";
import Newlogs from './components/LogsPage/Newlogs';
import Metrics from './components/metrics/Metrics';
import Header from "./components/header/Header";

function App() {
  const RedirectToExternalUrl = () => {
    window.location.href = 'https://6607f911beefcf6c9ac30903-netenondmx.chromatic.com/';
    return null;
  };

  return (
    <>
      <Routes>
        <Route path='/logs' element={<Newlogs />} />
        <Route path='/storybook' element={<RedirectToExternalUrl />} />
        <Route path='*' element={<Metrics />} />
      </Routes>
    </>
  );
}

export default App;
