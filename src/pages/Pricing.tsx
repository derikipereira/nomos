import React from 'react';
import { Check, X } from 'lucide-react';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Gratuito',
      price: 'R$ 0',
      period: 'para sempre',
      description: 'Perfeito para começar',
      features: [
        { text: 'Geração de recibos simples', included: true },
        { text: 'Download em PDF', included: true },
        { text: 'Limite de 3 recibos por mês', included: true },
        { text: 'Dashboard básico', included: false },
        { text: 'Histórico completo', included: false },
        { text: 'Personalização de marca', included: false },
        { text: 'Suporte prioritário', included: false },
      ],
      buttonText: 'Começar Grátis',
      buttonClass: 'bg-gray-800 hover:bg-gray-700'
    },
    {
      name: 'Profissional',
      price: 'R$ 29,90',
      period: 'por mês',
      description: 'Para profissionais em crescimento',
      features: [
        { text: 'Recibos ilimitados', included: true },
        { text: 'Download em PDF', included: true },
        { text: 'Dashboard completo', included: true },
        { text: 'Histórico completo', included: true },
        { text: 'Personalização de marca', included: true },
        { text: 'Relatórios básicos', included: true },
        { text: 'Suporte por email', included: true },
      ],
      buttonText: 'Assinar Agora',
      buttonClass: 'bg-indigo-600 hover:bg-indigo-700',
      popular: true
    },
    {
      name: 'Business',
      price: 'R$ 59,90',
      period: 'por mês',
      description: 'Para negócios estabelecidos',
      features: [
        { text: 'Tudo do plano Profissional', included: true },
        { text: 'Multi-usuários', included: true },
        { text: 'Relatórios avançados', included: true },
        { text: 'API de integração', included: true },
        { text: 'Personalização avançada', included: true },
        { text: 'Suporte prioritário 24/7', included: true },
        { text: 'Treinamento exclusivo', included: true },
      ],
      buttonText: 'Contrate Agora',
      buttonClass: 'bg-gray-800 hover:bg-gray-700'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-800 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Planos e Preços</h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Escolha o plano ideal para o seu negócio. Comece gratuitamente e
              faça upgrade conforme seu crescimento.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                  plan.popular ? 'ring-2 ring-indigo-600 transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-indigo-600 text-white text-center py-2 text-sm font-medium">
                    Mais Popular
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-500 mr-3" />
                        ) : (
                          <X className="h-5 w-5 text-red-500 mr-3" />
                        )}
                        <span className={feature.included ? 'text-gray-900' : 'text-gray-400'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    className={`w-full py-3 px-6 rounded-lg text-white font-medium ${plan.buttonClass}`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Perguntas Frequentes
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: 'Posso mudar de plano a qualquer momento?',
                answer: 'Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alterações serão refletidas na sua próxima fatura.'
              },
              {
                question: 'Como funciona o período gratuito?',
                answer: 'O plano gratuito não tem prazo de expiração e você pode usar as funcionalidades básicas sem custo, com limite de 3 recibos por mês.'
              },
              {
                question: 'Quais formas de pagamento são aceitas?',
                answer: 'Aceitamos cartões de crédito, débito, boleto bancário e PIX para todos os planos pagos.'
              },
              {
                question: 'Preciso fornecer dados de cartão de crédito para testar?',
                answer: 'Não, você pode usar o plano gratuito sem fornecer dados de pagamento.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;