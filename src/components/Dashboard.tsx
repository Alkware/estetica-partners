import React, { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { MetricCard } from './MetricCard';
import { PerformanceChart } from './PerformanceChart';
import { RecentReferrals } from './RecentReferrals';
import { AffiliateLink } from './AffiliateLink';
import {
  Users,
  Crown,
  TrendingUp,
  DollarSign,
  Calendar,
  CreditCard
} from 'lucide-react';
import { useDate } from '@/hooks/useDate';
import { usePlanManagement } from '@/hooks/usePlanManagement';
import { useMetricStore } from '@/stores/metricStore';
import { useMask } from '@/hooks/useMask';

export const Dashboard: React.FC = () => {
  const { partner } = useAuthStore();
  const { maskToMoney } = useMask();
  const { newDate } = useDate();
  const { isCommissionPaid, getCurrentActivePlan } = usePlanManagement();
  const { metricData, refreshMetrics } = useMetricStore();

  useEffect(() => {
    refreshMetrics(partner!, { isCommissionPaid, newDate, getCurrentActivePlan });
  }, [partner])

  const recentReferrals = partner?.referrals.slice(0, 5) || [];
  const performanceData = [
    { event: "Cliques", number: metricData.partnerClicks },
    { event: "Cadastros", number: metricData.totalReferrals },
    { event: "Upgrades", number: metricData.totalUpgrades}
  ];

  return (
      <div className="p-6 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-[#00c8ff] to-[#0d96eb] rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Olá, {partner?.name}! 👋</h2>
          <p className="text-white mb-4">
            Aqui está um resumo do seu desempenho como parceiro Wipzee
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            title="Total de Indicados"
            value={metricData.totalReferrals}
            icon={Users}
            trend={{
              value: metricData.growthReferrals,
            }}
            color="blue"
          />
          <MetricCard
            title="Upgrades Premium"
            value={metricData.totalUpgrades}
            icon={Crown}
            trend={{
              value: metricData.growthUpdates
            }}
            color="purple"
          />
          <MetricCard
            title="Taxa de Conversão"
            value={`${metricData.conversionRate}%`}
            icon={TrendingUp}
            color="green"
          />
          <MetricCard
            title="Total de Comissões"
            value={maskToMoney(metricData.totalCommissions)}
            icon={DollarSign}
            color="green"
          />
          <MetricCard
            title="Disponível p/ Saque"
            value={maskToMoney(metricData.comissionAvailable)}
            icon={CreditCard}
            color="orange"
          />
          <MetricCard
            title="Saques disponíveis no mês"
            value={`${4 - metricData.withdrawalAvailable} de  4`}
            icon={Calendar}
            color="blue"
          />
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <PerformanceChart data={performanceData} />
          </div>
          <div>
            <AffiliateLink partnerId={partner?.tag_id || ''} />
          </div>
        </div>

        {/* Recent Referrals */}
        <RecentReferrals referrals={recentReferrals} />
      </div>
  );
};