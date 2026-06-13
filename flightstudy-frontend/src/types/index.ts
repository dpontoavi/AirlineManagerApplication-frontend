export interface Airport {
  IATA: string;
  ICAO: string;
  name: string;
  city: string;
}

export interface Aircraft {
  model: string;
  regNumber: string;
  airline: string;
  manufacturer: string;
}

export interface Flight {
  id: number;
  flightNumber: string;
  origin: Airport;
  destination: Airport;
  aircraft: Aircraft;
  date: string;
  flightDepart: string;
  flightArr: string;
  terminal: string;
  gate: string;
  group: number;
  seat: string;
  passenger: string;
  status: string;
}
export interface BoardingPass {
  id: number;
  flightId: number;
  flightNumber: string;
  passenger: string;
  seat: string;
  terminal: string;
  gate: string;
  group: number;
  date: string;
  flightDepart: string;
  flightArrival: string;
  status: string;
}