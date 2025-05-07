import React, { useState } from 'react';
import { Save, X, Eye, Send, Download, Receipt, ChevronsUpDown } from 'lucide-react';

const NewReceipt: React.FC = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    client: '',
    email: '',
    service: '',
    description: '',
    value: '',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'pix',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the form submission, like saving the receipt
    console.log('Form submitted:', formData);
    // Show preview
    setShowPreview(true);
  };

  // Format number as currency
  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (!numericValue) return '';
    
    const number = parseInt(numericValue, 10) / 100;
    return number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const formattedValue = formatCurrency(rawValue);
    
    setFormData(prev => ({
      ...prev,
      value: formattedValue
    }));
  };

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Novo Recibo</h1>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button 
              type="button"
              className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center text-sm"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? <X className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
              {showPreview ? 'Fechar Visualização' : 'Visualizar Recibo'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Receipt form */}
          <div className={`lg:col-span-${showPreview ? '3' : '5'}`}>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Client section */}
                  <div className="md:col-span-2">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Informações do Cliente</h2>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block">
                      <span className="text-gray-700 text-sm font-medium">Nome do Cliente *</span>
                      <input
                        type="text"
                        name="client"
                        value={formData.client}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        placeholder="Nome completo ou razão social"
                        required
                      />
                    </label>
                    
                    <label className="block">
                      <span className="text-gray-700 text-sm font-medium">Email do Cliente</span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        placeholder="email@exemplo.com"
                      />
                    </label>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block">
                      <span className="text-gray-700 text-sm font-medium">CPF/CNPJ do Cliente</span>
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
                  
                  {/* Service section */}
                  <div className="md:col-span-2 pt-4 border-t border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Detalhes do Serviço</h2>
                  </div>
                  
                  <div className="md:col-span-2 space-y-3">
                    <label className="block">
                      <span className="text-gray-700 text-sm font-medium">Serviço Prestado *</span>
                      <input
                        type="text"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        placeholder="Título do serviço prestado"
                        required
                      />
                    </label>
                    
                    <label className="block">
                      <span className="text-gray-700 text-sm font-medium">Descrição do Serviço</span>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
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
                        value={formData.value}
                        onChange={handleCurrencyChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        placeholder="R$ 0,00"
                        required
                      />
                    </label>
                    
                    <label className="block">
                      <span className="text-gray-700 text-sm font-medium">Data do Serviço *</span>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        required
                      />
                    </label>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block">
                      <span className="text-gray-700 text-sm font-medium">Forma de Pagamento</span>
                      <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
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
                        value={formData.notes}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        placeholder="Informações adicionais (opcional)"
                      />
                    </label>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="md:col-span-2 pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-3 justify-end">
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancelar
                      </button>
                      
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center"
                        onClick={() => setShowPreview(true)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar
                      </button>
                      
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Salvar Recibo
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          {/* Receipt preview */}
          {showPreview && (
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6 bg-gradient-to-r from-blue-800 to-blue-700 text-white">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Receipt className="h-6 w-6 mr-2" />
                        <h2 className="text-xl font-bold">Recibo</h2>
                      </div>
                      <div className="text-sm">
                        <span className="bg-white text-blue-800 py-1 px-2 rounded-full font-medium">
                          {formData.value || 'R$ 0,00'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Prestador do Serviço</h3>
                      <div className="space-y-1">
                        <p className="text-gray-900 font-medium">Ana Silva</p>
                        <p className="text-gray-600 text-sm">CPF: 123.456.789-00</p>
                        <p className="text-gray-600 text-sm">Telefone: (11) 98765-4321</p>
                        <p className="text-gray-600 text-sm">Email: ana.silva@exemplo.com</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Cliente</h3>
                      <div className="space-y-1">
                        <p className="text-gray-900 font-medium">{formData.client || 'Nome do Cliente'}</p>
                        <p className="text-gray-600 text-sm">{formData.email || 'email@exemplo.com'}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Detalhes do Serviço</h3>
                      <div className="space-y-1">
                        <p className="text-gray-900 font-medium">{formData.service || 'Título do Serviço'}</p>
                        <p className="text-gray-600 text-sm">{formData.description || 'Descrição do serviço prestado'}</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Data:</span>
                        <span className="text-gray-900 font-medium">{formData.date ? formatDate(formData.date) : 'DD/MM/AAAA'}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Forma de Pagamento:</span>
                        <span className="text-gray-900 font-medium">
                          {formData.paymentMethod === 'pix' && 'PIX'}
                          {formData.paymentMethod === 'creditCard' && 'Cartão de Crédito'}
                          {formData.paymentMethod === 'debitCard' && 'Cartão de Débito'}
                          {formData.paymentMethod === 'bankTransfer' && 'Transferência Bancária'}
                          {formData.paymentMethod === 'cash' && 'Dinheiro'}
                          {formData.paymentMethod === 'other' && 'Outro'}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-200">
                        <span className="text-gray-800 font-medium">Valor Total:</span>
                        <span className="text-gray-900 font-bold">{formData.value || 'R$ 0,00'}</span>
                      </div>
                    </div>
                    
                    {formData.notes && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Observações</h3>
                        <p className="text-gray-600 text-sm">{formData.notes}</p>
                      </div>
                    )}
                    
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-center items-center">
                        <div className="text-xs text-gray-500">
                          Este recibo é válido como comprovante de prestação de serviço.
                          <br />
                          <span className="font-medium text-blue-800">ReciboJá</span> · Gerado em {new Date().toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2 justify-center">
                      <button className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 flex items-center text-sm">
                        <Send className="h-4 w-4 mr-2" />
                        Enviar por Email
                      </button>
                      <button className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 flex items-center text-sm">
                        <Download className="h-4 w-4 mr-2" />
                        Baixar PDF
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewReceipt;