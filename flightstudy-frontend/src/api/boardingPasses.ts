import { client } from './client';
import { type BoardingPass } from '../types';

export async function getBoardingPasses(): Promise<BoardingPass[]> {
  const res = await client.get('/api/v1/boarding-passes');
  return res.data;
}

export async function createBoardingPass(pass: Omit<BoardingPass, 'id'>): Promise<BoardingPass> {
  const res = await client.post('/api/v1/boarding-passes', pass);
  return res.data;
}

export async function deleteBoardingPass(id: number): Promise<void> {
  await client.delete(`/api/v1/boarding-passes/${id}`);
}