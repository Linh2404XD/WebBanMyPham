// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/login/login.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* Thêm các route khác ở đây */}
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
