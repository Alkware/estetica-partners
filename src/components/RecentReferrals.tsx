import React from 'react';
import { Crown, User as UserIcon } from 'lucide-react';
import { User } from '../types/user.types';
import { usePlanManagement } from '@/hooks/usePlanManagement';

interface RecentReferralsProps {
  referrals: User[];
}

export const RecentReferrals: React.FC<RecentReferralsProps> = ({ referrals }) => {
  const { getCurrentActivePlan } = usePlanManagement();
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-[#444]">Indicações Recentes</h3>
        <span className="text-sm text-gray-500">{referrals.length} registros</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Nome</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Data</th>
              <th className="text-center py-3 px-2 text-sm font-medium text-gray-600">Status</th>
              <th className="text-right py-3 px-2 text-sm font-medium text-gray-600">Valor</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((referral) => (
              <tr key={referral.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#00c8ff] to-[#0d96eb] rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {referral.user_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-[#444]">{referral.user_name}</p>
                      <p className="text-xs text-gray-500">{referral.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2 text-sm text-gray-600">
                  {new Date(referral.created_at).toLocaleDateString('pt-BR')}
                </td>
                <td className="py-4 px-2 text-center">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                    getCurrentActivePlan(referral.plan_management)?.plan.plan_name.toLowerCase().includes("pro")
                      ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {getCurrentActivePlan(referral.plan_management)?.plan.plan_name.toLowerCase().includes("pro") ? (
                      <>
                        <Crown size={12} />
                        {getCurrentActivePlan(referral.plan_management)?.plan.plan_name}
                      </>
                    ) : (
                      <>
                        <UserIcon size={12} />
                        Gratuito
                      </>
                    )}
                  </span>
                </td>
                <td className="py-4 px-2 text-right">
                  <span className={`font-medium whitespace-nowrap ${
                    (getCurrentActivePlan(referral.plan_management)?.plan.plan_value || 0) > 0 ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    R$ {((getCurrentActivePlan(referral.plan_management)?.partner_comissions?.commission_value || 0) / 100).toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};