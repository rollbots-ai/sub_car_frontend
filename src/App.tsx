import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CarProvider } from './context/CarContext';
import HomePage from './pages/HomePage';
import CarDetailPage from './pages/CarDetailPage';
// import { ChatWidget } from './components/ChatWidget';
import './index.css';

function App() {
  return (
    <Router>
      <CarProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/car/:id" element={<CarDetailPage />} />
        </Routes>
        {/* <ChatWidget /> */}
      </CarProvider>
    </Router>
  );
}

export default App;
