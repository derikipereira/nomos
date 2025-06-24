import React from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const isSuccess = type === 'success';
  const bgColor = isSuccess ? 'bg-green-100' : 'bg-red-100';
  const textColor = isSuccess ? 'text-green-800' : 'text-red-800';
  const Icon = isSuccess ? CheckCircle : AlertCircle;

  return (
    <div className={`fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg flex items-start ${bgColor} ${textColor}`}>
      <Icon className="h-5 w-5 mr-3 mt-0.5" />
      <div className="flex-1">
        <p className="font-medium">{isSuccess ? 'Sucesso!' : 'Erro!'}</p>
        <p className="text-sm">{message}</p>
      </div>
      <button onClick={onClose} className={`ml-4 -mt-1 -mr-1 p-1 rounded-full hover:bg-black/10`}>
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Notification;
