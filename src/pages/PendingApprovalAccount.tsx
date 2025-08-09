import { useAuthStore } from '@/stores/authStore';
import { Clock } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PendingApprovalPage() {
  const { authenticate } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    refreshPartnerData();
    const checkApproval = setInterval(() => refreshPartnerData(), (1000 * 5 * 60));
    return () => clearInterval(checkApproval)
  }, [])


  async function refreshPartnerData() {
    const partner = await authenticate();
    if (!partner) navigate("/login");
    else if (partner.is_active) navigate("/")
  }

  function logout() {
    localStorage.removeItem("token");
    navigate("/login")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-[#00c8ff] to-[#0d96eb] rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">W</span>
          </div>
          <h1 className="text-2xl font-bold text-[#444] mb-2">Aguardando Aprovação</h1>
          <p className="text-gray-600">Wipzee Agendamentos</p>
        </div>

        <div className="animate-pulse mb-6 flex justify-center">
          <Clock size={60} className="text-blue-500" />
        </div>
        <p className="text-gray-600 max-w-md">
          Seu cadastro foi enviado com sucesso! Agora é só aguardar a aprovação
          pela nossa equipe. Assim que aprovado, você receberá uma notificação por e-mail ou WhatsApp.
        </p>

        <div className="mt-8">
          <div className="inline-flex items-center justify-center gap-2 text-gray-500 text-sm">
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></span>
            <span>Aguardando aprovação...</span>
          </div>
        </div>


        <button
          className="w-full mt-12 cursor-pointer bg-gradient-to-r border text-[#0d96eb] py-3 px-4 rounded-lg font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          onClick={logout}
        >Voltar</button>
      </div>
    </div>
  );
}
