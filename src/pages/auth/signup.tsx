import React, { useState } from "react";
import { Mail, Lock, LayoutGrid, User, FileText } from "lucide-react";
import FormInput from "./components/FormInput";
import Button from "./components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface SignupForm {
  name: string;
  cpf: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ApiError {
  message: string | string[];
  error: string;
  statusCode: number;
}

const Signup: React.FC = () => {
  const [form, setForm] = useState<SignupForm>({
    name: "",
    cpf: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Partial<SignupForm>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<SignupForm> = {};

    if (!form.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!form.cpf.trim()) {
      newErrors.cpf = "CPF é obrigatório";
    }
    
    if (!form.email) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Formato de e-mail inválido";
    }

    if (!form.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (form.password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      await axios.post("http://localhost:3000/auth/signup", {
        name: form.name,
        cpf: form.cpf,
        email: form.email,
        password: form.password,
      });

      console.log("Cadastro bem-sucedido!");
      navigate("/login"); 

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const apiError = error.response.data as ApiError;
        console.error("Erro de API:", apiError.message);
        
        if (error.response.status === 409) {
           setErrors({ email: "Este e-mail já está em uso." });
        } else {
           setErrors({ email: "Ocorreu um erro ao criar a conta. Tente novamente." });
        }

      } else {
        console.error("Erro inesperado:", error);
        setErrors({
          email: "Não foi possível conectar ao servidor. Verifique sua rede.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 bg-orange-500 text-white p-8 flex-col justify-between">
         <div className="flex items-center space-x-2">
           <LayoutGrid size={32} className="text-white" />
           <span className="text-2xl font-bold">Nomos</span>
         </div>
         <div className="space-y-6 max-w-md">
           <h1 className="text-4xl font-bold">
             Facilite sua gestão como autônomo
           </h1>
           <p className="text-blue-100 text-lg">
             Gere recibos, organize seus atendimentos e cuide dos seus clientes
             em um só lugar.
           </p>
         </div>
         <div className="text-sm text-blue-200">
           © 2025 Nomos. Todos os direitos reservados.
         </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex md:hidden items-center justify-center mb-8">
            <LayoutGrid size={32} className="text-orange-500" />
            <span className="text-2xl font-bold ml-2 text-orange-500">Nomos</span>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8 w-full">
            <div className="max-w-md w-full mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Crie sua conta
                </h1>
                <p className="text-gray-600">Preencha os campos para se registrar</p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <FormInput
                  label="Nome Completo"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Seu nome completo"
                  value={form.name}
                  onChange={handleChange}
                  icon={<User size={18} />}
                  error={errors.name}
                  autoComplete="name"
                  required
                />
                
                <FormInput
                  label="CPF"
                  type="text"
                  name="cpf"
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={form.cpf}
                  onChange={handleChange}
                  icon={<FileText size={18} />}
                  error={errors.cpf}
                  required
                />
                
                <FormInput
                  label="E-mail"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="voce@exemplo.com"
                  value={form.email}
                  onChange={handleChange}
                  icon={<Mail size={18} />}
                  error={errors.email}
                  autoComplete="email"
                  required
                />

                <FormInput
                  label="Senha"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  icon={<Lock size={18} />}
                  error={errors.password}
                  autoComplete="new-password"
                  required
                />

                <FormInput
                  label="Confirme a Senha"
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  icon={<Lock size={18} />}
                  error={errors.confirmPassword}
                  autoComplete="new-password"
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isLoading}
                  className="w-full !mt-6"
                >
                  Criar Conta
                </Button>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Já tem uma conta?{" "}
                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="font-medium text-orange-500 hover:text-orange-900 transition-colors duration-200"
                    >
                      Faça login
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;