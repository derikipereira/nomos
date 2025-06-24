import React from 'react';
import { ChevronDown } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  cpf: string;
}

interface ClientInformationProps {
  clients: Client[];
  customerId: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ClientInformation: React.FC<ClientInformationProps> = ({ clients, customerId, onChange }) => (
  <>
    <div className="md:col-span-2">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Informações do Cliente</h2>
    </div>
    <div className="md:col-span-2">
      <label htmlFor="customerId" className="block text-sm font-medium text-gray-700">Cliente *</label>
      <div className="relative">
        <select
          id="customerId"
          name="customerId"
          value={customerId}
          onChange={onChange}
          className="mt-1 block w-full appearance-none rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        >
          <option value="">Selecione um cliente</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>{client.name} - {client.cpf}</option>
          ))}
        </select>
        <ChevronDown className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  </>
);

export default ClientInformation;
