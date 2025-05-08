import React, { useState } from "react";
import ClientInformation from "./components/ClientInformation";
import ServiceDetails from "./components/ServiceDetails";
import ReceiptPreview from "./components/ReceiptPreview";
import FormActions from "./components/FormActions";

interface FormData {
  client: string;
  email: string;
  service: string;
  description: string;
  value: string;
  date: string;
  paymentMethod: string;
  notes: string;
}

const NewReceipt: React.FC = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    client: "",
    email: "",
    service: "",
    description: "",
    value: "",
    date: new Date().toISOString().split("T")[0],
    paymentMethod: "pix",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    if (!numericValue) return "";

    const number = parseInt(numericValue, 10) / 100;
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const formattedValue = formatCurrency(rawValue);

    setFormData((prev) => ({
      ...prev,
      value: formattedValue,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    setShowPreview(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Novo Recibo</h1>
        </div>

        <div>
          <div className={`lg:col-span-${showPreview ? "3" : "5"}`}>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ClientInformation
                    client={formData.client}
                    email={formData.email}
                    onChange={handleChange}
                  />

                  <ServiceDetails
                    service={formData.service}
                    description={formData.description}
                    value={formData.value}
                    date={formData.date}
                    paymentMethod={formData.paymentMethod}
                    notes={formData.notes}
                    onChange={handleChange}
                    onCurrencyChange={handleCurrencyChange}
                  />

                  <FormActions
                    onCancel={() => console.log("Cancel clicked")}
                    onPreview={setShowPreview}
                    showPreview={showPreview}
                    onSubmit={handleSubmit}
                  />
                </div>
              </form>
            </div>
          </div>

          {showPreview && (
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <ReceiptPreview formData={formData} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewReceipt;
