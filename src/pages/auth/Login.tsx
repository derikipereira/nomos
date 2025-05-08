import React, { useState } from "react";
import { Mail, Lock, LayoutGrid } from "lucide-react";
import FormInput from "./components/FormInput";
import Button from "./components/Button";
import { useNavigate } from "react-router-dom";

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Partial<LoginForm>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginForm> = {};

    if (!form.email) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!form.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (form.password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      console.log("Login enviado:", form);
      navigate("/dashboard");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 bg-blue-600 text-white p-8 flex-col justify-between">
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

          <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="bg-blue-500/30 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-semibold mb-1">Recibos Profissionais</h3>
              <p className="text-sm text-blue-100">
                Emita recibos personalizados com facilidade
              </p>
            </div>
            <div className="bg-blue-500/30 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-semibold mb-1">Gestão de Clientes</h3>
              <p className="text-sm text-blue-100">
                Organize seus atendimentos e histórico
              </p>
            </div>
            <div className="bg-blue-500/30 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-semibold mb-1">Relatórios Financeiros</h3>
              <p className="text-sm text-blue-100">
                Acompanhe seus ganhos mensais de forma simples
              </p>
            </div>
            <div className="bg-blue-500/30 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-semibold mb-1">Agenda Inteligente</h3>
              <p className="text-sm text-blue-100">
                Gerencie seus horários e evite conflitos
              </p>
            </div>
          </div>
        </div>

        <div className="text-sm text-blue-200">
          © 2025 Nomos. Todos os direitos reservados.
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex md:hidden items-center justify-center mb-8">
            <LayoutGrid size={32} className="text-blue-600" />
            <span className="text-2xl font-bold ml-2 text-blue-600">Nomos</span>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8 w-full">
            <div className="max-w-md w-full mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Bem-vindo ao Nomos
                </h1>
                <p className="text-gray-600">Acesse sua conta para continuar</p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
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
                  autoComplete="current-password"
                  required
                />

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={form.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Lembrar-me
                    </span>
                  </label>
                  <button
                    type="button"
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    Esqueceu a senha?
                  </button>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isLoading}
                  className="w-full"
                >
                  Entrar
                </Button>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Ainda não tem uma conta?{" "}
                    <button
                      type="button"
                      className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      Cadastre-se
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

export default Login;
