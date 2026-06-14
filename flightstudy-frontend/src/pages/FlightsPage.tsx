import { useEffect, useState } from "react";
import { type Flight } from "../types";
import { deleteFlight, getFlights, createFlight } from "../api/flights";
import { setAuthToken } from "../api/client";
import { createBoardingPass } from "../api/boardingPasses";
import { NewFlightModal } from "../components/NewFlightModal";


interface FlightsPageProps {
  token: string | null;
}

export function FlightsPage({ token }: FlightsPageProps) {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (token) setAuthToken(token);
        getFlights()
            .then(setFlights)
            .catch(() => setError("Erro ao carregar voos"))
            .finally(() => setLoading(false))
    }, [token]);

    //default lang is PT-BR. there should or will at some point exist a EN version

    if (loading) return <p>Carregando voos...</p>
    if (error) return <p>{error}</p>
    if (!flights.length) return <p>Nenhum voo cadastrado.</p>

    async function handleCreateFlight(flight: Omit<Flight, 'id'>) {
      const created = await createFlight(flight);
      setFlights(prev => [...prev, created]);
      setShowModal(false)
    }

    async function handleGenerateBoardingPass(flight: Flight) {
      await createBoardingPass({
        flightId: flight.id,
        flightNumber: flight.flightNumber,
        passenger: flight.passenger,
        seat: flight.seat,
        terminal: flight.terminal,
        gate: flight.gate,
        group: flight.group,
        date: flight.date,
        flightDepart: flight.flightDepart,
        flightArrival: flight.flightArr,
        status: flight.status,
      });
      alert(`Cartão gerado para ${flight.flightNumber}!`);
    }
    async function handleDelete(id: number) {
      await deleteFlight(id);
      setFlights(prev => prev.filter(f => f.id !== id));
    }

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {flights.map(flight => (
        <div key={flight.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm transition-all duration-200 hover:py-10 hover:rounded-[30px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-8xl font-medium">{flight.flightNumber}</span>
              <span className="text-2xl px-2 py-1 rounded-full bg-blue-50 text-blue-700">{flight.status}</span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-4xl font-medium">{flight.origin.IATA}</span>
              <span className="text-gray-400 text-4xl">→</span>
              <span className="text-4xl font-medium">{flight.destination.IATA}</span>
            </div>
            <div className="text-sm text-gray-500 flex justify-between">
              <span>{flight.origin.CITY}</span>
              <span>{flight.destination.CITY}</span>
            </div>
            <div className="text-2xl text-gray-500 flex justify-between mt-1">
              <span>{flight.flightDepart}</span>
              <span>{flight.flightArr}</span>
            </div>
            <div className="text-4xl text-gray-400 mt-2">{flight.aircraft.model} · {flight.aircraft.airline}</div>
            {token && (
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleGenerateBoardingPass(flight)}
                className="flex-1 py-2 rounded-xl bg-[#1a2a4a] text-white text-sm transition hover:opacity-80"
              >
                Gerar cartão
              </button>
              <button
                onClick={() => handleDelete(flight.id)}
                className="py-2 px-4 rounded-xl bg-red-50 text-red-600 text-sm transition hover:bg-red-100"
              >
                Deletar
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
    {token && (
         <button onClick={() => setShowModal(true)} className="...">
              + Novo voo
         </button>
        )}

         {showModal && (
           <NewFlightModal onClose={() => setShowModal(false)} onCreate={handleCreateFlight} />
         )}
    </>
    );
    
}