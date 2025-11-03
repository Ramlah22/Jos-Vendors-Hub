import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from  "./Pages/Homepage"
import SignInPage from './components/Sign-in'
import Login from './components/login'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/create-account" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;