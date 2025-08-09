import React, { useState } from 'react';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { createPartner } from '@/api/partner.api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '../components/ui/modal/Modal';
import { useNavigate } from 'react-router-dom';
import { registerSchema, RegisterTypes } from '@/schemas/register.schema';
import { useFormatText } from '@/hooks/useFormatText';

export const Register: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { handleSubmit, formState, register } = useForm<RegisterTypes>({ resolver: zodResolver(registerSchema) });
    const navigate = useNavigate();
    const { maskToCellPhone } = useFormatText();

    // Função responsável por enviar os dados do usuário para api
    const handleRegister = async (data: Omit<RegisterTypes, "confirm_password"> & { confirm_password?: string }) => {
        setIsLoading(true);

        delete data.confirm_password
        const response = await createPartner(data);

        if (!response?.success) {
            setIsLoading(false);
            alert("dont create")
            return;
        }


        localStorage.setItem('token', response.data!.token);
        navigate("/pre-approval");
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#00c8ff] to-[#0d96eb] rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">W</span>
                    </div>
                    <h1 className="text-2xl font-bold text-[#444] mb-2">Seja um Parceiro</h1>
                    <p className="text-gray-600">Wipzee Agendamentos</p>
                </div>

                <form
                    onSubmit={handleSubmit(handleRegister)}
                    className="space-y-6"
                >
                    <div>
                        <label className="block text-sm font-medium text-[#444] mb-2">
                            Nome e sobrenome
                        </label>
                        <input
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00c8ff] focus:border-transparent transition-all duration-200"
                            placeholder="Maria Dolores"
                            {...register("name")}
                            required
                        />
                        <span
                            data-display={!!formState.errors["name"]}
                            className='text-red-600 data-[display=false]:hidden text-sm'
                        >{formState.errors["name"]?.message}</span>
                    </div>
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
                            Whatsapp
                        </label>
                        <input
                            type="tel"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00c8ff] focus:border-transparent transition-all duration-200"
                            placeholder='(35) 9 1111-1111'
                            {...register("cell_phone", { onChange: (e)=> { e.target.value = maskToCellPhone(e.target.value) }})}
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
                    <div>
                        <label className="block text-sm font-medium text-[#444] mb-2">
                            Confirme sua senha
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00c8ff] focus:border-transparent transition-all duration-200"
                                placeholder="••••••••"
                                required
                                {...register("confirm_password")}
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
                            data-display={!!formState.errors["confirm_password"]}
                            className='text-red-600 data-[display=false]:hidden text-sm'
                        >{formState.errors["confirm_password"]?.message}</span>
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
                                Criar conta
                            </>
                        )}
                    </button>
                    <button
                        className="w-full cursor-pointer bg-gradient-to-r border text-[#0d96eb] py-3 px-4 rounded-lg font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        onClick={() => navigate("/login")}
                    >Já possui uma conta?</button>
                </form>
            </div>
            <Modal />
        </div>
    );
};
