//simple app builder just for testing the backend
import { FlightsPage } from './FlightsPage';
import { BoardingPassesPage } from './boardingPassesPage';
import vectorDr from '../assets/VectorDr.png';
import leaoDeJuda from '../assets/leao de juda airlines.png';
import aviao from '../assets/aviao.jpg';
import { useState } from 'react';
    
type Tab = 'flights' | 'boarding';

interface HomePageProps {
    token: string | null;

}

export function HomePage({ token }: HomePageProps) {
const [tab, setTab] = useState<Tab>('flights');

return (
        <div className="min-h-screen bg-gradient-to-t from-gray-300 to-blue-300">

        {/* Hero */}
        <div className="relative h-196 overflow-hidden">
            <img src={aviao} alt="" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex items-start justify-between p-5 ">
                <div className="bg-white/70 backdrop-blur-md border border-white/40 flex items-start w-full justify-between p-5 rounded-[30px]">
                <img src={vectorDr} alt="Logo" className="h-25 w-auto z-10"/>
                <img src={leaoDeJuda} alt="Leão de Judá Airlines" className="h-26 w-auto z-10" />
            </div>
            </div>
        </div>

        {/* navbar */}
        <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-8 mx-4 -mt-6 rounded-2xl border border-white/40 bg-white/70 backdrop-blur-md shadow-sm transition-all duration-200 hover:py-10 hover:rounded-[30px]">
            <button
            onClick={() => setTab(tab === 'flights' ? 'boarding' : 'flights')}
            className="text-gray-500 hover:text-gray-800 transition"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" className="size-16">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>


            </button>

            <div className="flex gap-6">
            <button
                onClick={() => setTab('flights')}
                className={`text-4xl transition hover:text-gray-600 font-medium pb-0.5 border-b-2 ${
                tab === 'flights'
                    ? 'text-gray-900 border-gray-900'
                    : 'text-gray-400 border-transparent'
                }`}
            >
                Flights
            </button>
            <button
                onClick={() => setTab('boarding')}
                className={`text-4xl transition hover:text-gray-600 font-medium pb-0.5 border-b-2 ${
                tab === 'boarding'
                    ? 'text-gray-900 border-gray-900'
                    : 'text-gray-400 border-transparent'
                }`}
            >
                Boarding Passes
            </button>
            </div>

            <button
            onClick={() => setTab(tab === 'flights' ? 'boarding' : 'flights')}
            className="text-gray-500 hover:text-gray-800 transition"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" className="size-16">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>

            </button>
        </div>

        {/* Content */}
        <div className="m-4">
            {tab === 'flights' ? <FlightsPage token={token} /> : <BoardingPassesPage token={token} />}
        </div>

        <div className="py-20 bg-gray-800 text-white flex items-center grid p-6">
                <a href="https://github.com/dpontoavi" target="_blank" rel="noreferrer" className='text-3xl font-medium mb-6'>Github</a>
                <a href="https://www.linkedin.com/in/dpontoavi/" target="_blank" rel="noreferrer" className='text-3xl font-medium mb-6'>LinkedIn</a>
                <span className='text-6xl font-medium text-right font-mono'>.dpontoavi</span>
        </div>
        </div>
    );
}