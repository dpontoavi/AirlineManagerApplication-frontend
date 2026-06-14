import { useState } from 'react';
import { type Flight } from '../types';

interface NewFlightModalProps {
  onClose: () => void;
  onCreate: (flight: Omit<Flight, 'id'>) => void;
}

const emptyFlight = {
  flightNumber: '',
  origin: { IATA: '', ICAO: '', NAME: '', CITY: '' },
  destination: { IATA: '', ICAO: '', NAME: '', CITY: '' },
  aircraft: { model: '', regNumber: '', airline: '', manufacturer: '' },
  date: '',
  flightDepart: '',
  flightArr: '',
  terminal: '',
  gate: '',
  group: 0,
  seat: '',
  passenger: '',
  status: 'SCHEDULED',
};

export function NewFlightModal({ onClose, onCreate }: NewFlightModalProps) {
  const [form, setForm] = useState(emptyFlight);

  function set(field: string, value: string | number) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function setNested(parent: 'origin' | 'destination' | 'aircraft', field: string, value: string) {
    setForm(prev => ({ ...prev, [parent]: { ...prev[parent], [field]: value } }));
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-medium mb-4">Novo voo</h2>
        <div className="flex flex-col gap-3">

          <Field label="Número do voo">
            <input placeholder="LJ1234" onChange={e => set('flightNumber', e.target.value)} />
          </Field>

          <Section label="Origem">
            <Row>
              <input placeholder="IATA" onChange={e => setNested('origin', 'IATA', e.target.value)} />
              <input placeholder="ICAO" onChange={e => setNested('origin', 'ICAO', e.target.value)} />
            </Row>
            <input placeholder="Nome do aeroporto" onChange={e => setNested('origin', 'NAME', e.target.value)} />
            <input placeholder="Cidade" onChange={e => setNested('origin', 'CITY', e.target.value)} />
          </Section>

          <Section label="Destino">
            <Row>
              <input placeholder="IATA" onChange={e => setNested('destination', 'IATA', e.target.value)} />
              <input placeholder="ICAO" onChange={e => setNested('destination', 'ICAO', e.target.value)} />
            </Row>
            <input placeholder="Nome do aeroporto" onChange={e => setNested('destination', 'NAME', e.target.value)} />
            <input placeholder="Cidade" onChange={e => setNested('destination', 'CITY', e.target.value)} />
          </Section>

          <Section label="Aeronave">
            <Row>
              <input placeholder="Modelo" onChange={e => setNested('aircraft', 'model', e.target.value)} />
              <input placeholder="Registro" onChange={e => setNested('aircraft', 'regNumber', e.target.value)} />
            </Row>
            <Row>
              <input placeholder="Companhia" onChange={e => setNested('aircraft', 'airline', e.target.value)} />
              <input placeholder="Fabricante" onChange={e => setNested('aircraft', 'manufacturer', e.target.value)} />
            </Row>
          </Section>

          <Section label="Voo">
            <Row>
              <input placeholder="Data" onChange={e => set('date', e.target.value)} />
              <input placeholder="Partida" onChange={e => set('flightDepart', e.target.value)} />
            </Row>
            <Row>
              <input placeholder="Chegada" onChange={e => set('flightArr', e.target.value)} />
              <input placeholder="Terminal" onChange={e => set('terminal', e.target.value)} />
            </Row>
            <Row>
              <input placeholder="Portão" onChange={e => set('gate', e.target.value)} />
              <input placeholder="Grupo" type="number" onChange={e => set('group', Number(e.target.value))} />
            </Row>
            <Row>
              <input placeholder="Assento" onChange={e => set('seat', e.target.value)} />
              <input placeholder="Passageiro" onChange={e => set('passenger', e.target.value)} />
            </Row>
          </Section>

          <div className="flex gap-2 mt-2">
            <button onClick={onClose}
              className="flex-1 py-2 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition">
              Cancelar
            </button>
            <button onClick={() => onCreate(form)}
              className="flex-1 py-2 rounded-xl bg-[#1a2a4a] text-white text-sm hover:opacity-80 transition">
              Criar voo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-gray-400 font-medium">{label}</p>
      {children}
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-2">{children}</div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs text-gray-400 font-medium">{label}</p>
      {children}
    </div>
  );
}