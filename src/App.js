// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Kanban from './components/Kanban';
import './App.css';

function App() {
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/kanban" element={user ? <Kanban /> : <Login onLogin={handleLogin} />} />
                    <Route path="/" element={<h1>Bem-vindo à aplicação!</h1>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
