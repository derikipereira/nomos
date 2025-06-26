import React from 'react';
import { Download } from 'lucide-react';
import { Document, Page, PDFDownloadLink, PDFViewer, StyleSheet, Text, View} from '@react-pdf/renderer';



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

interface ReceiptPreviewProps {
  formData: FormData;
  selectedClient?: Client;
  authUser?: AuthUser;
  receiptNumber: string; 
}


const formatCurrency = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const formatDate = (dateString: string) => new Date(dateString + 'T00:00:00').toLocaleDateString('pt-BR');




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
  formData: FormData, 
  selectedClient?: Client, 
  authUser?: AuthUser, 
  receiptNumber: string 
}> = ({ formData, selectedClient, authUser}) => (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        

        <View style={pdfStyles.header}>
          <Text style={pdfStyles.title}>RECIBO</Text>
          <Text style={pdfStyles.valueHeader}>{formatCurrency(formData.value)}</Text>
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
          <Text style={pdfStyles.content}>{selectedClient?.name || '____________________'}</Text>
          <Text style={{ ...pdfStyles.label, marginTop: 4 }}>CPF: {selectedClient?.cpf || '____________________'}</Text>
        </View>

        <View style={pdfStyles.section}>
          <Text style={pdfStyles.label}>Referente a:</Text>
          <Text style={pdfStyles.content}>{formData.service_type || '____________________'}</Text>
          {formData.description && (
              <Text style={{ ...pdfStyles.label, marginTop: 4, fontStyle: 'italic' }}>
                {formData.description}
              </Text>
          )}
        </View>
      
        <View style={[pdfStyles.section, pdfStyles.sectionRow]}>
          <View>
            <Text style={pdfStyles.label}>Forma de Pagamento:</Text>
            <Text style={{ fontSize: 12 }}>{formData.payment_type}</Text>
          </View>
          <View style={{ textAlign: 'right' }}>
            <Text style={pdfStyles.label}>Data de Emissão:</Text>
            <Text style={{ fontSize: 12 }}>{formatDate(formData.date)}</Text>
          </View>
        </View>
      
        {formData.notes && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.label}>Observações:</Text>
            <Text style={{ fontSize: 11 }}>{formData.notes}</Text>
          </View>
        )}
      
        <View style={pdfStyles.signatureSection}>
            <View style={pdfStyles.signatureLine}>
                <Text style={pdfStyles.issuerName}>{authUser?.name || '____________________'}</Text>
                <Text style={pdfStyles.issuerDocument}>CPF/CNPJ: {authUser?.document || '____________________'}</Text>
            </View>
        </View>

        {/* RODAPÉ */}
        <Text style={pdfStyles.footer}>
          Este recibo é válido como comprovante de pagamento pelos serviços descritos.
        </Text>
      </Page>
    </Document>
);



const ReceiptPreview: React.FC<ReceiptPreviewProps> = ({ formData, selectedClient, authUser, receiptNumber }) => {
  const pdfFileName = `Recibo_${receiptNumber}_${selectedClient?.name.replace(/\s/g, '_') || 'Cliente'}.pdf`;

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Pré-visualização do Recibo</h2>
        <PDFDownloadLink 
          document={<ReceiptPDFDocument formData={formData} selectedClient={selectedClient} authUser={authUser} receiptNumber={receiptNumber} />} 
          fileName={pdfFileName}
        >
          {({ loading }) => (
            <button className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 flex items-center text-sm" disabled={loading}>
              <Download className="h-4 w-4 mr-2" />
              {loading ? 'Gerando...' : 'Baixar PDF'}
            </button>
          )}
        </PDFDownloadLink>
      </div>
      <div style={{ height: '70vh', border: '1px solid #e2e8f0', borderRadius: '0.5rem', overflow: 'hidden' }}>
        <PDFViewer width="100%" height="100%" showToolbar={true}>
          <ReceiptPDFDocument formData={formData} selectedClient={selectedClient} authUser={authUser} receiptNumber={receiptNumber} />
        </PDFViewer>
      </div>
    </>
  );
};

export default ReceiptPreview;