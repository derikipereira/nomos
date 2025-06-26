import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; 

import ClientInformation from './components/ClientInformation';
import ServiceDetails from './components/ServiceDetails';
import ReceiptPreview from './components/ReceiptPreview';
import FormActions from './components/FormActions';
import Notification from './components/Notification';

interface Client {
  id: string;
  name: string;
  cpf: string;
}

interface FormData {
  customerId: string;
  service_type: string;
  description: string;
  value: number;
  date: string;
  payment_type: string;
  notes: string;
}


interface AuthUser {
  name: string;
  document: string;
}

const NewReceipt: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);

  const [authUser, setAuthUser] = useState<AuthUser | undefined>();

  const [formData, setFormData] = useState<FormData>({
    customerId: "",
    service_type: "",
    description: "",
    value: 0,
    date: new Date().toISOString().split("T")[0],
    payment_type: "PIX",
    notes: "",
  });
  
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get('auth_token');
      if (!token) {
        setNotification({ message: 'Sessão inválida. Por favor, faça login novamente.', type: 'error' });
        navigate('/login'); 
        return;
      }
      
      try {

        const decodedToken: { sub: string } = jwtDecode(token);
        const userId = decodedToken.sub;

        
        if (!userId) {
          throw new Error("ID do usuário não encontrado no token.");
        }

        const headers = { Authorization: `Bearer ${token}` };

        const clientsPromise = axios.get('http://localhost:3000/customers', { headers });
        const userPromise = axios.get(`http://localhost:3000/user/${userId}`, { headers });

        const [clientsResponse, userResponse] = await Promise.all([clientsPromise, userPromise]);

        setClients(clientsResponse.data);

        const userData = userResponse.data;
        setAuthUser({
          name: userData.name,

          document: userData.cpf || userData.cnpj || 'Não informado',
        });

      } catch (error) {
        console.error("Erro ao carregar dados da página:", error);
        setNotification({ message: 'Falha ao carregar dados essenciais. Tente recarregar a página.', type: 'error' });
      }
    };

    fetchData();
  }, [navigate]); 
  
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'value' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!formData.customerId || !formData.service_type || formData.value <= 0) {
      setNotification({ message: 'Preencha os campos obrigatórios: Cliente, Serviço e Valor.', type: 'error' });
      setIsLoading(false);
      return;
    }
    
    try {
        const token = Cookies.get('auth_token');
        await axios.post('http://localhost:3000/receipts', {
            value: formData.value,
            description: formData.description,
            date: formData.date,
            payment_type: formData.payment_type,
            service_type: formData.service_type,
            customer_id: formData.customerId,
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setNotification({ message: 'Recibo salvo com sucesso!', type: 'success' });
        setTimeout(() => navigate('/historico'), 1500);
    } catch(error) {
        console.error("Erro ao salvar recibo:", error);
        const errorMessage = (error as any).response?.data?.message || 'Ocorreu um erro ao salvar.';
        setNotification({ message: Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage, type: 'error' });
    } finally {
        setIsLoading(false);
    }
  };
  
  const selectedClient = clients.find(c => c.id === formData.customerId);

  return (
    <div className="bg-gray-50 min-h-screen">
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Novo Recibo</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ClientInformation
                clients={clients}
                customerId={formData.customerId}
                onChange={handleChange}
              />
              <ServiceDetails
                formData={{...formData}}
                onChange={handleChange}
              />
              <FormActions
                onCancel={() => navigate('/historico')}
                showPreview={showPreview}
                onPreview={setShowPreview}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </div>
          </div>

          <div>
            {showPreview && (
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-8">
                <ReceiptPreview
                  formData={formData}
                  selectedClient={selectedClient}
                  authUser={authUser}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewReceipt;