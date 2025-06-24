import React from 'react';

interface FormData {
  service_type: string;
  description: string;
  value: number;
  date: string;
  payment_type: string;
  notes: string;
}

interface ServiceDetailsProps {
    formData: FormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ formData, onChange }) => {
    const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, "");
        onChange({
            ...e,
            target: { ...e.target, name: "value", value: rawValue ? (parseInt(rawValue, 10) / 100).toString() : "0" }
        });
    }

    const displayValue = formData.value > 0 
        ? formData.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) 
        : "";

    return (
        <>
            <div className="md:col-span-2 pt-4 border-t border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Detalhes do Serviço</h2>
            </div>
            <div className="md:col-span-2">
                <label htmlFor="service_type" className="block text-sm font-medium text-gray-700">Serviço Prestado *</label>
                <input type="text" id="service_type" name="service_type" value={formData.service_type} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800" required />
            </div>
            <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição do Serviço</label>
                <textarea id="description" name="description" value={formData.description} onChange={onChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800"></textarea>
            </div>
            <div>
                <label htmlFor="value" className="block text-sm font-medium text-gray-700">Valor *</label>
                <input type="text" id="value" name="value" value={displayValue} onChange={handleCurrencyChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800" placeholder="R$ 0,00" required />
            </div>
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Data *</label>
                <input type="date" id="date" name="date" value={formData.date} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800" required />
            </div>
            <div>
                <label htmlFor="payment_type" className="block text-sm font-medium text-gray-700">Forma de Pagamento</label>
                <select id="payment_type" name="payment_type" value={formData.payment_type} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800">
                    <option value="PIX">PIX</option>
                    <option value="Cartão de Crédito">Cartão de Crédito</option>
                    <option value="Cartão de Débito">Cartão de Débito</option>
                    <option value="Transferência Bancária">Transferência Bancária</option>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Outro">Outro</option>
                </select>
            </div>
             <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Observações</label>
                <input type="text" id="notes" name="notes" value={formData.notes} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800" placeholder="Informações adicionais" />
            </div>
        </>
    )
};

export default ServiceDetails;
