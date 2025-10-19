import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Problems from './pages/Problems';
import ProblemEditor from './pages/ProblemEditor';
import Settings from './pages/Settings';
import SecretDeveloper from './pages/SecretDeveloper';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ChatProvider } from './context/ChatContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
export function App() {
  return <ThemeProvider>
      <AuthProvider>
        <ChatProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<Layout />}>
                <Route path="/" element={<Problems />} />
                <Route path="/problems" element={<Problems />} />
                <Route path="/problem/:id" element={<ProblemEditor />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/secret-developer" element={<ProtectedRoute>
                      <SecretDeveloper />
                    </ProtectedRoute>} />
              </Route>
            </Routes>
          </Router>
        </ChatProvider>
      </AuthProvider>
    </ThemeProvider>;
}