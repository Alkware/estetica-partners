import React, { useEffect } from 'react';
import { Users, Crown, User } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { usePlanManagement } from '@/hooks/usePlanManagement';
import { useMetricStore } from '@/stores/metricStore';
import { useDate } from '@/hooks/useDate';
import { useMask } from '@/hooks/useMask';

export const Referrals: React.FC = () => {
  const { partner } = useAuthStore();
  const referrals = partner?.referrals || [];
  const { maskToMoney } = useMask();
  const { newDate } = useDate();
  const { getCurrentActivePlan, isCommissionPaid } = usePlanManagement();
  const { metricData, refreshMetrics } = useMetricStore();

  useEffect(() => {
    if (!partner) return;
    // Refresh metrics when partner data is available
    refreshMetrics(partner, { isCommissionPaid, newDate, getCurrentActivePlan })
  }, [partner]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row items-center justify-between">
        <h2 className="text-2xl font-bold text-[#444] whitespace-nowrap">Seus Indicados</h2>
        {/* <div className="flex gap-2">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar indicado..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00c8ff] focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Filter size={20} />
            Filtros
          </button>
        </div> */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-100 rounded-xl">
              <Users size={24} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total de Indicados</p>
              <p className="text-2xl font-bold text-[#444]">{metricData.totalReferrals}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-xl">
              <Crown size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Plano Pago</p>
              <p className="text-2xl font-bold text-[#444]">{metricData.totalUpgrades}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <User size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Usuários ativos</p>
              <p className="text-2xl font-bold text-[#444]">{metricData.activeUsers?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Referrals Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-[#444]">Lista de Indicados</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Indicado</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Data de Cadastro</th>
                <th className="text-center py-3 px-6 text-sm font-medium text-gray-600">Status</th>
                <th className="text-right py-3 px-6 text-sm font-medium text-gray-600">Valor Gerado</th>
              </tr>
            </thead>
            <tbody>
              {referrals.sort((a, b)=> newDate(b.created_at).valueOf() - newDate(a.created_at).valueOf()).map((referral) => (
                <tr key={referral.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#00c8ff] to-[#0d96eb] rounded-full flex items-center justify-center text-white font-medium">
                        {referral.user_name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-[#444]">{referral.user_name}</p>
                        <p className="text-sm text-gray-500">{referral.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {new Date(referral.created_at).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getCurrentActivePlan(referral.plan_management)
                      ? 'bg-gradient-to-r from-yellow-100 to-orange-200 text-orange-700'
                      : metricData.activeUsers?.some(user => user.id === referral.id) ?
                        'bg-gradient-to-r from-blue-100 to-blue-300 text-blue-700'
                        : 'bg-gray-100 text-gray-600'
                      }`}>
                      {getCurrentActivePlan(referral.plan_management) ? (
                        <>
                          <Crown size={12} />
                          Plano Pago
                        </>
                      ) : metricData.activeUsers?.some(user => user.id === referral.id) ?
                        <>
                          <User size={12} />
                          Usuário ativo
                        </>
                        :
                        <>
                          <User size={12} />
                          Inativo
                        </>
                      }
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className={`font-bold ${(getCurrentActivePlan(referral.plan_management)?.partner_comissions?.commission_value || 0) > 0 ? 'text-orange-600' : metricData.activeUsers?.some(user => user.id === referral.id) ? "text-blue-600" : 'text-gray-400'
                      }`}>
                      {maskToMoney(getCurrentActivePlan(referral.plan_management) ? getCurrentActivePlan(referral.plan_management)?.partner_comissions?.commission_value : metricData.activeUsers?.some(user => user.id === referral.id) ? 200 : 0)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};