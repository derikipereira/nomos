import React from "react";
import { Download, Send } from "lucide-react";

interface ReceiptPreviewProps {
  formData: {
    client: string;
    email: string;
    service: string;
    description: string;
    value: string;
    date: string;
    paymentMethod: string;
    notes: string;
  };
}

const ReceiptPreview: React.FC<ReceiptPreviewProps> = ({ formData }) => {
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-8">
        <div className="text-center border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">RECIBO</h1>
          <p className="text-xl font-bold text-gray-900 mt-4">
            R$ {formData.value.replace("R$", "").trim() || "0,00"}
          </p>
        </div>

        <div className="text-sm text-gray-600 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-gray-900">Ana Silva</p>
              <p>CPF: 123.456.789-00</p>
              <p>Tel: (11) 98765-4321</p>
              <p>ana.silva@exemplo.com</p>
            </div>
            <div className="text-right">
              <p>Nº 0001</p>
              <p>{formData.date ? formatDate(formData.date) : "DD/MM/AAAA"}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-gray-600">Recebemos de</p>
            <p className="font-medium text-gray-900 border-b border-gray-300 pb-1">
              {formData.client || "_____________________"}
            </p>
          </div>

          <div>
            <p className="text-gray-600">A importância de</p>
            <p className="font-medium text-gray-900 border-b border-gray-300 pb-1">
              {formData.value || "_____________________"}
            </p>
          </div>

          <div>
            <p className="text-gray-600">Referente a</p>
            <p className="font-medium text-gray-900 border-b border-gray-300 pb-1">
              {formData.service || "_____________________"}
            </p>
            {formData.description && (
              <p className="text-sm text-gray-600 mt-1">
                {formData.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Forma de Pagamento</p>
              <p className="font-medium text-gray-900">
                {formData.paymentMethod === "pix" && "PIX"}
                {formData.paymentMethod === "creditCard" && "Cartão de Crédito"}
                {formData.paymentMethod === "debitCard" && "Cartão de Débito"}
                {formData.paymentMethod === "bankTransfer" &&
                  "Transferência Bancária"}
                {formData.paymentMethod === "cash" && "Dinheiro"}
                {formData.paymentMethod === "other" && "Outro"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">Data</p>
              <p className="font-medium text-gray-900">
                {formData.date ? formatDate(formData.date) : "DD/MM/AAAA"}
              </p>
            </div>
          </div>

          {formData.notes && (
            <div className="text-sm text-gray-600 border-t border-gray-200 pt-4 mt-6">
              <p className="font-medium">Observações:</p>
              <p>{formData.notes}</p>
            </div>
          )}

          <div className="border-t border-gray-200 pt-8 mt-8">
            <div className="border-b border-gray-900 w-80 mx-auto mt-12"></div>
            <p className="text-center text-gray-600 mt-2">Assinatura do cliente</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-center text-gray-500 mt-8">
          Este recibo é válido como comprovante de prestação de serviço após a
          assinatura do cliente.
        </div>
      </div>

      {/* Actions */}
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
  );
};

export default ReceiptPreview;
