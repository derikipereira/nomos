import React from 'react';
import { Users, Shield, Award, CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-800 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Sobre o Nomos</h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Capacitando profissionais autônomos com ferramentas inteligentes para 
              gerenciar seus negócios de forma eficiente e profissional.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa Missão</h2>
              <p className="text-lg text-gray-600 mb-6">
                O Nomos nasceu da necessidade de simplificar a vida dos profissionais autônomos,
                oferecendo ferramentas que automatizam tarefas administrativas e permitem mais
                foco no que realmente importa: seu trabalho e seus clientes.
              </p>
              <p className="text-lg text-gray-600">
                Nosso objetivo é ser o parceiro definitivo dos profissionais independentes,
                fornecendo soluções que facilitam a gestão do dia a dia e impulsionam o
                crescimento profissional.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Users className="h-10 w-10 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">+10 mil</h3>
                <p className="text-gray-600">Profissionais Atendidos</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Shield className="h-10 w-10 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">100%</h3>
                <p className="text-gray-600">Segurança de Dados</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Award className="h-10 w-10 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">5 Anos</h3>
                <p className="text-gray-600">De Experiência</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <CheckCircle className="h-10 w-10 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">99.9%</h3>
                <p className="text-gray-600">Disponibilidade</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nossos Valores</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Confiabilidade</h3>
              <p className="text-gray-600">
                Mantemos seus dados seguros e garantimos a disponibilidade do sistema 24/7.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Foco no Cliente</h3>
              <p className="text-gray-600">
                Desenvolvemos nossas soluções pensando nas necessidades reais dos profissionais.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excelência</h3>
              <p className="text-gray-600">
                Buscamos constantemente aprimorar nossos serviços e oferecer a melhor experiência.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nossa Equipe</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                name: 'Carlos Silva',
                role: 'CEO & Fundador',
                image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300'
              },
              {
                name: 'Ana Santos',
                role: 'CTO',
                image: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=300'
              },
              {
                name: 'Roberto Lima',
                role: 'Head de Produto',
                image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300'
              },
              {
                name: 'Mariana Costa',
                role: 'Head de Design',
                image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=300'
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;