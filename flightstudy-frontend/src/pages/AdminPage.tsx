import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { client } from '../api/client';


//simple login page accesible via local/admin, change at your needs and implement better security
interface AdminPageProps {
  onLogin: (token: string) => void;
  token: string | null;
}

export function AdminPage({ onLogin, token }: AdminPageProps) {
  const [authUrl, setAuthUrl] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 w-full max-w-sm text-center">
          <p className="text-gray-700 mb-4">Você já está autenticado.</p>
          <button
            onClick={() => navigate('/')}
            className="w-full py-2 rounded-xl bg-[#1a2a4a] text-white transition hover:opacity-80"
          >
            Voltar para o início
          </button>
        </div>
      </div>
    );
  }

  async function handleLogin() {
    setError(null);
    setLoading(true);
    try {
      const res = await client.post(authUrl, { login, password });
      onLogin(res.data.token);
      navigate('/');
    } catch {
      setError('Credenciais inválidas ou URL incorreta.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
        <div
         className="absolute inset-0 blur-md bg-blue-300 scale-110"
         style={{ backgroundImage: 'url(/src/assets/aviao.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}/>
      <div className=" z-10 border border-gray-200 rounded-2xl p-8 w-full max-w-2xl shadow-sm bg-white/30 backdrop-blur-xl">
        <h1 className="text-8xl font-medium mb-6 text-gray-900 text-center">Admin Panel</h1>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-2xl text-gray-500 mb-1 block">URL de autenticação</label>
            <input
              type="text"
              placeholder="/auth/xxxxxxxx"
              value={authUrl}
              onChange={e => setAuthUrl(e.target.value)}
              className="text-2xl w-full border border-gray-200 rounded-xl px-8 py-4 focus:outline-none focus:border-gray-400"
            />
          </div>

          <div>
            <label className="text-2xl text-gray-500 mb-1 block">Login</label>
            <input
              type="text"
              value={login}
              onChange={e => setLogin(e.target.value)}
              className="text-2xl w-full border border-gray-200 rounded-xl px-8 py-4 focus:outline-none focus:border-gray-400"
            />
          </div>

          <div>
            <label className="text-2xl text-gray-500 mb-1 block">Senha</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="text-2xl w-full border border-gray-200 rounded-xl px-8 py-4 text-2xl focus:outline-none focus:border-gray-400"
            />
          </div>

          {error && <p className="text-red-700 text-2xl">{error}</p>}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-2 rounded-xl bg-[#1a2a4a] text-white transition hover:opacity-80 disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </div>
    </div>
  );
}