import { Route, Routes } from "react-router-dom";
import Newlogs from './components/LogsPage/Newlogs';
import Metrics from './components/metrics/Metrics';
import Header from "./components/header/Header";

function App() {
  return(
    <>
    <Routes>
      <Route path='/logs' element={<Newlogs></Newlogs>}></Route>
      <Route path='*' element={<Metrics></Metrics>}></Route> 
    </Routes>
    </>
  )
}

export default App;
