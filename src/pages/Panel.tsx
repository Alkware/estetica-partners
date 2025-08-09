import { Commissions } from "@/components/Commissions/Commissions";
import { Dashboard } from "@/components/Dashboard";
import { Header } from "@/components/Header";
import { Materials } from "@/components/Materials";
import { Referrals } from "@/components/Referrals";
import { Sidebar } from "@/components/Sidebar";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type PanelProps = {};

export function Panel({ }: PanelProps) {
    const [activeTab, setActiveTab] = useState('dashboard');
    const auth = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login")
            return;
        }
    }, [auth.isAuthenticated])

    useEffect(() => {
        (async () => {
            const isAuthenticate = await auth.authenticate();
            if (!isAuthenticate) {
                localStorage.removeItem("token")
                navigate("/login")
            }
        })();
    }, [])


    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <Dashboard />;
            case 'commissions':
                return <Commissions />;
            case 'referrals':
                return <Referrals />;
            case 'materials':
                return <Materials />;
            case 'support':
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-[#444] mb-4">Suporte</h2>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <p className="text-gray-600 mb-4">Entre em contato conosco:</p>
                            <div className="space-y-2">
                                <p className="text-sm"><strong>Email:</strong> suporte@wipzee.com.br</p>
                                <p className="text-sm"><strong>WhatsApp:</strong> (11) 99999-9999</p>
                                <p className="text-sm"><strong>Horário:</strong> Segunda a Sexta, 9h às 18h</p>
                            </div>
                        </div>
                    </div>
                );
            case 'settings':
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-[#444] mb-4">Configurações</h2>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <p className="text-gray-600">Configurações da conta em desenvolvimento...</p>
                        </div>
                    </div>
                );
            default:
                return <Dashboard />;
        }
    };

    return (
        !auth.isAuthenticated ? <span>Carregando</span>
            :
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="flex h-[calc(100vh-80px)]">
                    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                    <main className="flex-1 overflow-auto">
                        {renderContent()}
                    </main>
                </div>
            </div>
    );
}