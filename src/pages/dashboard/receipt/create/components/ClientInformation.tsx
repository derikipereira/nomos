import React from "react";

interface ClientInformationProps {
  client: string;
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ClientInformation: React.FC<ClientInformationProps> = ({
  client,
  email,
  onChange,
}) => {
  return (
    <>
      <div className="md:col-span-2">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Informações do Cliente
        </h2>
      </div>

      <div className="space-y-3">
        <label className="block">
          <span className="text-gray-700 text-sm font-medium">
            Nome do Cliente *
          </span>
          <input
            type="text"
            name="client"
            value={client}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="Nome completo ou razão social"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700 text-sm font-medium">
            Email do Cliente
          </span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="email@exemplo.com"
          />
        </label>
      </div>

      <div className="space-y-3">
        <label className="block">
          <span className="text-gray-700 text-sm font-medium">
            CPF/CNPJ do Cliente
          </span>
          <input
            type="text"
            name="documentNumber"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="000.000.000-00"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 text-sm font-medium">Endereço</span>
          <input
            type="text"
            name="address"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="Endereço completo"
          />
        </label>
      </div>
    </>
  );
};

export default ClientInformation;
