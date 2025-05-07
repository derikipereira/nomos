import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define types
interface ProfileData {
  name: string;
  email: string;
  phone?: string;
  documentType: 'cpf' | 'cnpj';
  document: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  profession: string;
  company?: string;
  website?: string;
  logo?: string;
  bankInfo?: {
    bank?: string;
    agency?: string;
    account?: string;
    pixKey?: string;
  };
}

interface ProfileContextType {
  profile: ProfileData;
  updateProfile: (updates: Partial<ProfileData>) => void;
}

// Create context
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Context provider
export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default profile data
  const [profile, setProfile] = useState<ProfileData>({
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
    bankInfo: {
      bank: 'Banco do Brasil',
      agency: '1234-5',
      account: '12345-6',
      pixKey: 'ana.silva@exemplo.com',
    },
  });

  const updateProfile = (updates: Partial<ProfileData>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const value = {
    profile,
    updateProfile,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook to use the context
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};