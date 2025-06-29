import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Trash2, Eye, FileText, X, Download, PlusCircle } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; 
import { PDFViewer, PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';


interface Client {
  id: string;
  name: string;
  cpf: string;
}

interface Receipt {
  id: string;
  value: number;
  description: string;
  service_type: string;
  payment_type: string;
  date: string;
  customer: Client;
  notes: string; 
}

interface AuthUser { 
  name: string;
  document: string;
}


const pdfStyles = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 11, padding: 40, backgroundColor: '#fff', color: '#333' },
  header: { 
    textAlign: 'center', 
    borderBottomWidth: 1, 
    borderBottomColor: '#eaeaea', 
    paddingBottom: 20, 
    marginBottom: 30 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#1a202c' 
  },
  receiptNumber: { 
    fontSize: 10,
    color: '#6b7280',
    marginTop: 4,
  },
  valueHeader: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginTop: 10 
  },
  section: { 
    marginBottom: 20 
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: { 
    fontSize: 10, 
    color: '#666' 
  },
  content: { 
    fontSize: 12, 
    fontWeight: 'bold', 
    borderBottomWidth: 1, 
    borderBottomColor: '#f3f4f6', 
    paddingBottom: 4, 
    marginTop: 2 
  },
  signatureSection: {
    marginTop: 80,
    textAlign: 'center',
  },
  signatureLine: {
    borderTop: 1,
    borderTopColor: '#333',
    width: '60%',
    margin: 'auto',
    paddingTop: 8,
  },
  issuerName: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  issuerDocument: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  footer: { 
    position: 'absolute', 
    bottom: 30, 
    left: 40, 
    right: 40, 
    textAlign: 'center', 
    color: 'grey', 
    fontSize: 9 
  },
});

const ReceiptPDFDocument: React.FC<{
  receipt: Receipt;
  authUser?: AuthUser;
}> = ({ receipt, authUser }) => (
  <Document title={`Recibo Nº ${receipt.id}`}>
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.header}>
        <Text style={pdfStyles.title}>RECIBO</Text>
        <Text style={pdfStyles.valueHeader}>{receipt.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
      </View>

      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Emitente:</Text>
        <Text style={pdfStyles.content}>{authUser?.name || '____________________'}</Text>
        <Text style={{ ...pdfStyles.label, marginTop: 4 }}>
          CPF/CNPJ: {authUser?.document || '____________________'}
        </Text>
      </View>

      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Recebido de:</Text>
        <Text style={pdfStyles.content}>{receipt.customer.name}</Text>
        <Text style={{ ...pdfStyles.label, marginTop: 4 }}>CPF: {receipt.customer.cpf}</Text>
      </View>
      
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Referente a:</Text>
        <Text style={pdfStyles.content}>{receipt.service_type}</Text>
        {receipt.description && (
          <Text style={{ ...pdfStyles.label, marginTop: 4, fontStyle: 'italic' }}>
            {receipt.description}
          </Text>
        )}
      </View>
      
      <View style={[pdfStyles.section, pdfStyles.sectionRow]}>
        <View>
          <Text style={pdfStyles.label}>Forma de Pagamento:</Text>
          <Text style={{ fontSize: 12 }}>{receipt.payment_type}</Text>
        </View>
        <View style={{ textAlign: 'right' }}>
          <Text style={pdfStyles.label}>Data de Emissão:</Text>
          <Text style={{ fontSize: 12 }}>{new Date(receipt.date).toLocaleDateString('pt-BR')}</Text>
        </View>
      </View>
      
      {receipt.notes && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.label}>Observações:</Text>
          <Text style={{ fontSize: 11 }}>{receipt.notes}</Text>
        </View>
      )}
      
      <View style={pdfStyles.signatureSection}>
        <View style={pdfStyles.signatureLine}>
          <Text style={pdfStyles.issuerName}>{authUser?.name || '____________________'}</Text>
          <Text style={pdfStyles.issuerDocument}>CPF/CNPJ: {authUser?.document || '____________________'}</Text>
        </View>
      </View>
      
      <Text style={pdfStyles.footer}>
        Este recibo é válido como comprovante de pagamento pelos serviços descritos.
      </Text>
    </Page>
  </Document>
);


const ViewReceiptModal: React.FC<{ receipt: Receipt | null; onClose: () => void; authUser?: AuthUser }> = ({ receipt, onClose, authUser }) => {
  if (!receipt) return null;

  const pdfFileName = `Recibo_${receipt.customer.name.replace(/\s/g, '_')}_${receipt.date.split('T')[0]}.pdf`;
  const pdfDocument = <ReceiptPDFDocument receipt={receipt} authUser={authUser} />;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
        <div className="p-4 border-b flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Visualizar Recibo</h3>
              <p className="text-sm text-gray-600">Cliente: {receipt.customer.name}</p>
            </div>
            <div className="flex items-center gap-4">
                <PDFDownloadLink document={pdfDocument} fileName={pdfFileName}>
                    {({ loading }) => (
                        <button className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 flex items-center text-sm" disabled={loading}>
                            <Download className="h-4 w-4 mr-2" />
                            {loading ? 'Gerando...' : 'Baixar PDF'}
                        </button>
                    )}
                </PDFDownloadLink>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
            </div>
        </div>
        <div style={{ height: '75vh' }}>
          <PDFViewer width="100%" height="100%" showToolbar={true}>
            {pdfDocument}
          </PDFViewer>
        </div>
      </div>
    </div>
  );
};

const ReceiptHistory: React.FC = () => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' }>({ key: 'date', direction: 'desc' });
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingReceipt, setViewingReceipt] = useState<Receipt | null>(null);
  const [authUser, setAuthUser] = useState<AuthUser | undefined>(); 


  useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
        const token = Cookies.get('auth_token');
        if (!token) {
          navigate('/login');
          return;
        }

        try {
            const decodedToken: { sub: string } = jwtDecode(token);
            const userId = decodedToken.sub;
            const headers = { Authorization: `Bearer ${token}` };

            const receiptsPromise = axios.get('http://localhost:3000/receipts', { headers });
            const userPromise = axios.get(`http://localhost:3000/user/${userId}`, { headers });

            const [receiptsResponse, userResponse] = await Promise.all([receiptsPromise, userPromise]);

            setReceipts(receiptsResponse.data);

            const userData = userResponse.data;
            setAuthUser({
                name: userData.name,
                document: userData.cpf || userData.cnpj || 'Não informado',
            });
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        } finally {
            setIsLoading(false);
        }
    };
    fetchData();
  }, [navigate]);

  const filteredAndSortedReceipts = useMemo(() => {
    let filtered = receipts.filter(r => 
      r.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.service_type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return [...filtered].sort((a, b) => {
        const keyA = sortConfig.key === 'client' ? a.customer.name : a[sortConfig.key as keyof Receipt];
        const keyB = sortConfig.key === 'client' ? b.customer.name : b[sortConfig.key as keyof Receipt];
        if (keyA < keyB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (keyA > keyB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });
  }, [receipts, searchQuery, sortConfig]);

  const handleSort = (key: string) => {
    setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));
  };

  const handleView = (receipt: Receipt) => {
    setViewingReceipt(receipt);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setViewingReceipt(null);
  };
  
  const handleDelete = async (receiptId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este recibo?")) {
      try {
        const token = Cookies.get('auth_token');
        await axios.delete(`http://localhost:3000/receipts/${receiptId}`, { headers: { Authorization: `Bearer ${token}` } });
        setReceipts(prev => prev.filter(r => r.id !== receiptId)); 
      } catch (error) {
        console.error("Erro ao excluir recibo:", error);
        alert("Falha ao excluir o recibo.");
      }
    }
  };

  return (
    <>
      {isModalOpen && <ViewReceiptModal receipt={viewingReceipt} onClose={handleCloseModal} authUser={authUser} />}
      
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Histórico de Recibos</h1>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Buscar por cliente ou serviço..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                onClick={() => navigate('/novo-recibo')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition-colors"
              >
                <PlusCircle size={18} />
                Novo Recibo
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('client')}>Cliente</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('service_type')}>Serviço</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('value')}>Valor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('date')}>Data</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading ? (
                    <tr><td colSpan={5} className="py-10 text-center text-gray-500">Carregando recibos...</td></tr>
                  ) : filteredAndSortedReceipts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-gray-500">
                        <FileText className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                        Nenhum recibo encontrado.
                      </td>
                    </tr>
                  ) : (
                    filteredAndSortedReceipts.map((receipt) => (
                      <tr key={receipt.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{receipt.customer.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receipt.service_type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{receipt.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(receipt.date).toLocaleDateString('pt-BR')}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                          <div className="flex items-center justify-end space-x-3">
                            <button onClick={() => handleView(receipt)} className="text-gray-500 hover:text-blue-600" title="Visualizar"><Eye size={18} /></button>
                            <button onClick={() => handleDelete(receipt.id)} className="text-gray-500 hover:text-red-600" title="Excluir"><Trash2 size={18} /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceiptHistory;