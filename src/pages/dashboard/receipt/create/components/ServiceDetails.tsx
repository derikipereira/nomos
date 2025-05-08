import React from "react";

interface ServiceDetailsProps {
  service: string;
  description: string;
  value: string;
  date: string;
  paymentMethod: string;
  notes: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onCurrencyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({
  service,
  description,
  value,
  date,
  paymentMethod,
  notes,
  onChange,
  onCurrencyChange,
}) => {
  return (
    <>
      <div className="md:col-span-2 pt-4 border-t border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Detalhes do Serviço
        </h2>
      </div>

      <div className="md:col-span-2 space-y-3">
        <label className="block">
          <span className="text-gray-700 text-sm font-medium">
            Serviço Prestado *
          </span>
          <input
            type="text"
            name="service"
            value={service}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="Título do serviço prestado"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700 text-sm font-medium">
            Descrição do Serviço
          </span>
          <textarea
            name="description"
            value={description}
            onChange={onChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="Descreva em detalhes o serviço que foi prestado"
          ></textarea>
        </label>
      </div>

      <div className="space-y-3">
        <label className="block">
          <span className="text-gray-700 text-sm font-medium">Valor *</span>
          <input
            type="text"
            name="value"
            value={value}
            onChange={onCurrencyChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="R$ 0,00"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700 text-sm font-medium">
            Data do Serviço *
          </span>
          <input
            type="date"
            name="date"
            value={date}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </label>
      </div>

      <div className="space-y-3">
        <label className="block">
          <span className="text-gray-700 text-sm font-medium">
            Forma de Pagamento
          </span>
          <select
            name="paymentMethod"
            value={paymentMethod}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="pix">PIX</option>
            <option value="creditCard">Cartão de Crédito</option>
            <option value="debitCard">Cartão de Débito</option>
            <option value="bankTransfer">Transferência Bancária</option>
            <option value="cash">Dinheiro</option>
            <option value="other">Outro</option>
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700 text-sm font-medium">Observações</span>
          <input
            type="text"
            name="notes"
            value={notes}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="Informações adicionais (opcional)"
          />
        </label>
      </div>
    </>
  );
};

export default ServiceDetails;
