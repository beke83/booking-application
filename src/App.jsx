import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Hotel from './pages/hotel/Hotel';
import List from './pages/list/List';
import './App.css';

export function App() {

  const body = {margin: '0'}

  return (
    <div style={body}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotel/:1d" element={<Hotel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
