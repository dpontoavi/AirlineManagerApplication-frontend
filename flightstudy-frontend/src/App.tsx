import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/Homepage';
import { AdminPage } from './pages/AdminPage';
import { setAuthToken } from './api/client';




export default function App() {
  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem('token')
  );

  useEffect(() => {
    if (token) setAuthToken(token);
  }, [token]);

  function handleLogin(newToken: string) {
    sessionStorage.setItem('token', newToken);
    setAuthToken(newToken);
    setToken(newToken);
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage token={token} />} />
      <Route path="/admin" element={<AdminPage onLogin={handleLogin} token={token} />} />
    </Routes>
  );
}
