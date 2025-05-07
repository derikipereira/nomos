import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define types
interface Receipt {
  id: string;
  client: string;
  email?: string;
  service: string;
  description?: string;
  value: string;
  date: string;
  paymentMethod: string;
  notes?: string;
  status: 'draft' | 'sent' | 'viewed' | 'downloaded' | 'paid';
  createdAt: string;
  updatedAt: string;
}

interface ReceiptContextType {
  receipts: Receipt[];
  addReceipt: (receipt: Omit<Receipt, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  updateReceipt: (id: string, updates: Partial<Receipt>) => void;
  deleteReceipt: (id: string) => void;
  getReceipt: (id: string) => Receipt | undefined;
}

// Create context
const ReceiptContext = createContext<ReceiptContextType | undefined>(undefined);

// Context provider
export const ReceiptProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);

  const addReceipt = (receiptData: Omit<Receipt, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const now = new Date().toISOString();
    const newReceipt: Receipt = {
      ...receiptData,
      id: `receipt_${Date.now()}`,
      status: 'draft',
      createdAt: now,
      updatedAt: now,
    };
    setReceipts([...receipts, newReceipt]);
    return newReceipt;
  };

  const updateReceipt = (id: string, updates: Partial<Receipt>) => {
    setReceipts(
      receipts.map(receipt => 
        receipt.id === id
          ? { ...receipt, ...updates, updatedAt: new Date().toISOString() }
          : receipt
      )
    );
  };

  const deleteReceipt = (id: string) => {
    setReceipts(receipts.filter(receipt => receipt.id !== id));
  };

  const getReceipt = (id: string) => {
    return receipts.find(receipt => receipt.id === id);
  };

  const value = {
    receipts,
    addReceipt,
    updateReceipt,
    deleteReceipt,
    getReceipt,
  };

  return (
    <ReceiptContext.Provider value={value}>
      {children}
    </ReceiptContext.Provider>
  );
};

// Custom hook to use the context
export const useReceipts = () => {
  const context = useContext(ReceiptContext);
  if (context === undefined) {
    throw new Error('useReceipts must be used within a ReceiptProvider');
  }
  return context;
};