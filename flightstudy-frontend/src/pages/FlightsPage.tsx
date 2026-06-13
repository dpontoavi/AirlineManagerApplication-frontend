import { useEffect, useState } from "react";
import { type Flight } from "../types";
import { getFlights } from "../api/flights";

export function FlightsPage() {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getFlights()
            .then(setFlights)
            .catch(() => setError("Erro ao carregar voos"))
            .finally(() => setLoading(false))
    }, []);

    //default lang is PT-BR. there should or will at some point exist a EN version

    if (loading) return <p>Carregando voos...</p>
    if (error) return <p>{error}</p>
    if (!flights.length) return <p>Nenhum voo cadastrado.</p>

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {flights.map(flight => (
        <div key={flight.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
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
              <span>{flight.origin.city}</span>
              <span>{flight.destination.city}</span>
            </div>
            <div className="text-2xl text-gray-500 flex justify-between mt-1">
              <span>{flight.flightDepart}</span>
              <span>{flight.flightArr}</span>
            </div>
            <div className="text-4xl text-gray-400 mt-2">{flight.aircraft.model} · {flight.aircraft.airline}</div>
        </div>
      ))}
    </div>
    );
}