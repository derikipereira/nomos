import React from 'react';
import { Download } from 'lucide-react';
import { Document, Page, PDFDownloadLink, PDFViewer, StyleSheet, Text, View } from '@react-pdf/renderer';

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

const pdfStyles = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 11, padding: 40, backgroundColor: '#fff', color: '#333' },
  header: { textAlign: 'center', borderBottomWidth: 1, borderBottomColor: '#eaeaea', paddingBottom: 20, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1a202c' },
  valueHeader: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  section: { marginBottom: 20 },
  label: { fontSize: 10, color: '#666' },
  content: { fontSize: 12, fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: '#ccc', paddingBottom: 4, marginTop: 2 },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, textAlign: 'center', color: 'grey', fontSize: 9 },
  signature: { borderTop: 1, borderTopColor: '#333', width: '60%', margin: 'auto', marginTop: 80, paddingTop: 5 }
});

const ReceiptPDFDocument: React.FC<{ formData: FormData, selectedClient?: Client }> = ({ formData, selectedClient }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.header}>
        <Text style={pdfStyles.title}>RECIBO</Text>
        <Text style={pdfStyles.valueHeader}>{formData.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Recebemos de:</Text>
        <Text style={pdfStyles.content}>{selectedClient?.name || '____________________'}</Text>
        <Text style={{ ...pdfStyles.label, marginTop: 4 }}>CPF: {selectedClient?.cpf || '____________________'}</Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Referente a:</Text>
        <Text style={pdfStyles.content}>{formData.service_type || '____________________'}</Text>
        {formData.description && <Text style={{ ...pdfStyles.label, marginTop: 4 }}>{formData.description}</Text>}
      </View>
      <View style={{ ...pdfStyles.section, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View><Text style={pdfStyles.label}>Forma de Pagamento:</Text><Text style={{ fontSize: 12 }}>{formData.payment_type}</Text></View>
        <View style={{ textAlign: 'right' }}><Text style={pdfStyles.label}>Data:</Text><Text style={{ fontSize: 12 }}>{new Date(formData.date + 'T00:00:00').toLocaleDateString('pt-BR')}</Text></View>
      </View>
      {formData.notes && <View style={pdfStyles.section}><Text style={pdfStyles.label}>Observações:</Text><Text style={{ fontSize: 11 }}>{formData.notes}</Text></View>}
      <View style={pdfStyles.signature}><Text style={{ textAlign: 'center' }}>Assinatura</Text></View>
      <Text style={pdfStyles.footer}>Este recibo é válido como comprovante de prestação de serviço.</Text>
    </Page>
  </Document>
);

interface ReceiptPreviewProps {
  formData: FormData;
  selectedClient?: Client;
}

const ReceiptPreview: React.FC<ReceiptPreviewProps> = ({ formData, selectedClient }) => {
  const pdfFileName = `Recibo_${selectedClient?.name.replace(/\s/g, '_') || 'Cliente'}_${formData.date}.pdf`;

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Pré-visualização do Recibo</h2>
        <PDFDownloadLink document={<ReceiptPDFDocument formData={formData} selectedClient={selectedClient} />} fileName={pdfFileName}>
          {({ loading }) => (
            <button className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 flex items-center text-sm" disabled={loading}>
              <Download className="h-4 w-4 mr-2" />
              {loading ? 'Gerando...' : 'Baixar PDF'}
            </button>
          )}
        </PDFDownloadLink>
      </div>
      <div style={{ height: '70vh', border: '1px solid #e2e8f0', borderRadius: '0.5rem', overflow: 'hidden' }}>
        <PDFViewer width="100%" height="100%" showToolbar={false}>
          <ReceiptPDFDocument formData={formData} selectedClient={selectedClient} />
        </PDFViewer>
      </div>
    </>
  );
};

export default ReceiptPreview;

