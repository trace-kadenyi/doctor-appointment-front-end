import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route to="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
