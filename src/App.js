import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './components/Home';
import User from './components/User';
import { setCurrentUser } from './Redux/UserReducer';

function App() {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  // if the user is logged in copy users data from the local storage to redux state.
  if (currentUser) { dispatch(setCurrentUser(currentUser)); }
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home /> } />
        <Route path="/" element={<User />} /> 
      </Routes>
    </Router>
  );
}

export default App;
