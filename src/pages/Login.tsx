import React, { useContext, useEffect, useState } from 'react';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { partnerLogin } from '@/api/partner.api';
import { useForm } from 'react-hook-form';
import { loginSchema, LoginTypes } from '@/schemas/login.schema'
import { zodResolver } from '@hookform/resolvers/zod';
import { ModalContext } from '@/context/ModalContext';
import { PopOver } from '../components/ui/modal/templates/PopOver';
import { Modal } from '../components/ui/modal/Modal';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const { setModalContent } = useContext(ModalContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, formState, register } = useForm<LoginTypes>({ resolver: zodResolver(loginSchema) });
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/pre-approval")
    }
  }, []);

  const handleLogin = async (data: LoginTypes) => {
    setIsLoading(true);

    const response = await partnerLogin(data);

    if (!response.success) {
      setModalContent({
        id: "error_login",
        component: <PopOver
          id='error_login'
          message={response.message}
          type='WARNING'
        />
      });
      setIsLoading(false);
      return;
    }

    if (!response.data) {
      console.error("Token is missing!");
      return;
    }

    localStorage.setItem('token', response.data);
    navigate("/pre-approval")
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-[#00c8ff] to-[#0d96eb] rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">W</span>
          </div>
          <h1 className="text-2xl font-bold text-[#444] mb-2">Painel de Parceiros</h1>
          <p className="text-gray-600">Wipzee Agendamentos</p>
        </div>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-[#444] mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00c8ff] focus:border-transparent transition-all duration-200"
              placeholder="seu@email.com"
              {...register("email")}
              required
            />
            <span
              data-display={!!formState.errors["email"]}
              className='text-red-600 data-[display=false]:hidden text-sm'
            >{formState.errors["email"]?.message}</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#444] mb-2">
              Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00c8ff] focus:border-transparent transition-all duration-200"
                placeholder="••••••••"
                required
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#00c8ff] transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <span
              data-display={!!formState.errors["password"]}
              className='text-red-600 data-[display=false]:hidden text-sm'
            >{formState.errors["password"]?.message}</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer bg-gradient-to-r from-[#00c8ff] to-[#0d96eb] text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={20} />
                Entrar
              </>
            )}
          </button>
          <button
            className="w-full cursor-pointer bg-gradient-to-r border text-[#0d96eb] py-3 px-4 rounded-lg font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            onClick={() => navigate("/register")}
          >Quero ser parceiro</button>
        </form>
      </div>
      <Modal />
    </div>
  );
};