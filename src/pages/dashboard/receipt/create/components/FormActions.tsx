import React from "react";
import { X, Eye, Save } from "lucide-react";

interface FormActionsProps {
  onCancel: () => void;
  showPreview: boolean;
  onPreview: (visible: boolean) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  showPreview,
  onPreview,
  onSubmit,
  isLoading,
}) => {
  return (
    <div className="md:col-span-2 pt-6 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center"
        >
          <X className="h-4 w-4 mr-2" />
          Cancelar
        </button>

        <button
          type="button"
          className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center text-sm"
          onClick={() => onPreview(!showPreview)}
        >
          {showPreview ? <X className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
          {showPreview ? "Ocultar PDF" : "Visualizar PDF"}
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center disabled:bg-blue-400"
        >
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? 'Salvando...' : 'Salvar Recibo'}
        </button>
      </div>
    </div>
  );
};

export default FormActions;
