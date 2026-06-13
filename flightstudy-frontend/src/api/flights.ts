import { client } from './client';
import { type Flight } from '../types';

export async function getFlights(): Promise<Flight[]> {
  const res = await client.get('/api/v1/flights');
  return res.data;
}

export async function createFlight(flight: Omit<Flight, 'id'>): Promise<Flight> {
  const res = await client.post('/api/v1/flights', flight);
  return res.data;
}

export async function deleteFlight(id: number): Promise<void> {
  await client.delete(`/api/v1/flights/${id}`);
}