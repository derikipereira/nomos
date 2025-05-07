import React, { useState } from 'react';
import { Save, Camera, User, Building, Phone, AtSign, MapPin } from 'lucide-react';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personal');
  
  // Mock profile data - would come from API in a real app
  const [profileData, setProfileData] = useState({
    name: 'Ana Silva',
    email: 'ana.silva@exemplo.com',
    phone: '(11) 98765-4321',
    documentType: 'cpf',
    document: '123.456.789-00',
    address: 'Rua Exemplo, 123',
    city: 'São Paulo',
    state: 'SP',
    zip: '01234-567',
    profession: 'Designer Gráfica',
    company: 'Studio Design',
    website: 'www.anasilvadesign.com.br',
    logo: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the form submission, like saving the profile data
    console.log('Profile data saved:', profileData);
    // Show success message
    alert('Perfil atualizado com sucesso!');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Perfil Profissional</h1>
          <p className="mt-2 text-gray-600">
            Mantenha suas informações atualizadas para gerar recibos profissionais
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'personal'
                  ? 'text-blue-800 border-b-2 border-blue-800'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('personal')}
            >
              Dados Pessoais
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'professional'
                  ? 'text-blue-800 border-b-2 border-blue-800'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('professional')}
            >
              Dados Profissionais
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'security'
                  ? 'text-blue-800 border-b-2 border-blue-800'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('security')}
            >
              Segurança
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-4">
                        <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {profileData.logo ? (
                            <img src={profileData.logo} alt="Profile" className="h-full w-full object-cover" />
                          ) : (
                            <User className="h-16 w-16 text-gray-400" />
                          )}
                        </div>
                        <button
                          type="button"
                          className="absolute bottom-0 right-0 p-2 bg-blue-800 text-white rounded-full hover:bg-blue-700"
                        >
                          <Camera className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <p className="text-sm text-gray-500 text-center mt-2">
                        Sua foto aparece em seu perfil e nos recibos (opcional)
                      </p>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 space-y-6">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 mb-4">Informações Pessoais</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
                          <input
                            type="text"
                            name="name"
                            value={profileData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Telefone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Tipo de Documento</label>
                          <select
                            name="documentType"
                            value={profileData.documentType}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            required
                          >
                            <option value="cpf">CPF</option>
                            <option value="cnpj">CNPJ</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            {profileData.documentType === 'cpf' ? 'CPF' : 'CNPJ'}
                          </label>
                          <input
                            type="text"
                            name="document"
                            value={profileData.document}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 mb-4">Endereço</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Endereço</label>
                          <input
                            type="text"
                            name="address"
                            value={profileData.address}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Cidade</label>
                          <input
                            type="text"
                            name="city"
                            value={profileData.city}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Estado</label>
                            <input
                              type="text"
                              name="state"
                              value={profileData.state}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700">CEP</label>
                            <input
                              type="text"
                              name="zip"
                              value={profileData.zip}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Professional Info Tab */}
            {activeTab === 'professional' && (
              <div className="p-6">
                <div className="max-w-3xl mx-auto space-y-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Informações Profissionais</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Profissão/Ocupação</label>
                      <input
                        type="text"
                        name="profession"
                        value={profileData.profession}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Empresa/Nome Fantasia (opcional)</label>
                      <input
                        type="text"
                        name="company"
                        value={profileData.company}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Website/Portfolio (opcional)</label>
                      <input
                        type="url"
                        name="website"
                        value={profileData.website}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        placeholder="https://www.seusite.com.br"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Logotipo/Marca</h2>
                    
                    <div className="flex items-center space-x-6">
                      <div className="flex-shrink-0">
                        <div className="h-24 w-24 rounded-md bg-gray-200 flex items-center justify-center">
                          {profileData.logo ? (
                            <img src={profileData.logo} alt="Logo" className="h-full w-full object-contain" />
                          ) : (
                            <Building className="h-12 w-12 text-gray-400" />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Logotipo da Empresa</label>
                        <input
                          type="file"
                          accept="image/*"
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                          Seu logotipo aparecerá nos recibos e documentos (opcional)
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Informações de Pagamento</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Banco</label>
                        <input
                          type="text"
                          name="bank"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          placeholder="Nome do banco"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Agência</label>
                          <input
                            type="text"
                            name="agency"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            placeholder="0000"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Conta</label>
                          <input
                            type="text"
                            name="account"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            placeholder="00000-0"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Chave PIX</label>
                        <input
                          type="text"
                          name="pixKey"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          placeholder="CPF, CNPJ, Email ou Telefone"
                        />
                      </div>
                    </div>
                    
                    <p className="mt-3 text-sm text-gray-500">
                      Estas informações podem ser exibidas opcionalmente nos recibos para facilitar o pagamento.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="p-6">
                <div className="max-w-3xl mx-auto space-y-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Segurança da Conta</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email de Acesso</label>
                      <input
                        type="email"
                        value={profileData.email}
                        disabled
                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm text-gray-500"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Este é o email usado para fazer login em sua conta
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-md font-medium text-gray-900 mb-3">Alteração de Senha</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Senha Atual</label>
                          <input
                            type="password"
                            name="currentPassword"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            placeholder="••••••••"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Nova Senha</label>
                          <input
                            type="password"
                            name="newPassword"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            placeholder="••••••••"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Confirmar Nova Senha</label>
                          <input
                            type="password"
                            name="confirmPassword"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            placeholder="••••••••"
                          />
                        </div>
                        
                        <div>
                          <button
                            type="button"
                            className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 text-sm"
                          >
                            Alterar Senha
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-md font-medium text-gray-900 mb-3">Opções de Segurança</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-700">Verificação em duas etapas</h4>
                            <p className="text-sm text-gray-500">
                              Adicione uma camada extra de segurança ao fazer login
                            </p>
                          </div>
                          <div className="form-switch inline-block align-middle">
                            <input
                              type="checkbox"
                              name="twoFactor"
                              id="twoFactor"
                              className="form-switch-checkbox"
                            />
                            <label className="form-switch-label" htmlFor="twoFactor"></label>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-700">Notificações de login</h4>
                            <p className="text-sm text-gray-500">
                              Receba um email quando sua conta for acessada de um novo dispositivo
                            </p>
                          </div>
                          <div className="form-switch inline-block align-middle">
                            <input
                              type="checkbox"
                              name="loginAlerts"
                              id="loginAlerts"
                              className="form-switch-checkbox"
                              defaultChecked
                            />
                            <label className="form-switch-label" htmlFor="loginAlerts"></label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-md font-medium text-red-600 mb-3">Zona de Perigo</h3>
                      
                      <div>
                        <button
                          type="button"
                          className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 text-sm"
                        >
                          Excluir Minha Conta
                        </button>
                        <p className="mt-1 text-sm text-gray-500">
                          Esta ação é irreversível e apagará todos os seus dados
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Form footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;