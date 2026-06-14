import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/Homepage';
import { AdminPage } from './pages/AdminPage';




export default function App() {
    const [token, setToken] = useState<string | null>(
    sessionStorage.getItem('token')  // lê o token salvo ao carregar
  );

  function handleLogin(token: string) {
    sessionStorage.setItem('token', token);  // salva ao fazer login
    setToken(token);
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage token={token} />} />
      <Route path="/admin" element={<AdminPage onLogin={handleLogin} token={token} />} />
    </Routes>
  );
}
