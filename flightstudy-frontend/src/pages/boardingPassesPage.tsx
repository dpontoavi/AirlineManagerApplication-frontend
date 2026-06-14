import { useEffect, useState } from 'react';
import { type BoardingPass } from '../types';
import { deleteBoardingPass, getBoardingPasses } from '../api/boardingPasses';
import { setAuthToken } from '../api/client';

interface BoardingPassesPageProps {
  token: string | null;
}

export function BoardingPassesPage({ token }: BoardingPassesPageProps) {
  const [passes, setPasses] = useState<BoardingPass[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) setAuthToken(token);
    getBoardingPasses()
      .then(setPasses)
      .catch(() => setError('Erro ao carregar cartões.'))
      .finally(() => setLoading(false));
  }, [token]);

  async function handleDelete(id: number) {
    await deleteBoardingPass(id);
    setPasses(prev => prev.filter(p => p.id !== id));
  }

  if (loading) return <p>Carregando cartões...</p>;
  if (error) return <p>{error}</p>;
  if (!passes.length) return <p className="p-4 text-gray-500 text-8xl">Nenhum cartão de embarque ainda.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {passes.map(pass => (
          <div key={pass.id} className="bg-white border border-gray-200 rounded-[20px] p-4 shadow-sm boarding-card transition-all duration-200 hover:py-15 hover:rounded-[30px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-8xl font-medium">{pass.flightNumber}</span>
              <span className="text-xl px-2 py-1 rounded-full bg-blue-50 text-blue-700">{pass.status}</span>
            </div>
            <div className="text-4xl text-gray-700 font-medium mb-10">{pass.passenger}</div>
            <div className="grid grid-cols-2 gap-y-5 text-2xl">
              <span className="text-gray-400">Assento</span>
              <span className="text-right">{pass.seat}</span>
              <span className="text-gray-400">Terminal</span>
              <span className="text-right">{pass.terminal}</span>
              <span className="text-gray-400">Portão</span>
              <span className="text-right">{pass.gate}</span>
              <span className="text-gray-400">Grupo</span>
              <span className="text-right">{pass.group}</span>
              <span className="text-gray-400">Partida</span>
              <span className="text-right">{pass.flightDepart}</span>
              <span className="text-gray-400">Chegada</span>
              <span className="text-right">{pass.flightArrival}</span>
            </div>

            {token && (
            <button
              onClick={() => handleDelete(pass.id)}
              className="w-full mt-4 py-2 rounded-xl bg-red-50 text-red-600 text-sm transition hover:bg-red-100"
            >
              Cancelar cartão
            </button>
          )}
        </div>
      ))}
    </div>
  );
}