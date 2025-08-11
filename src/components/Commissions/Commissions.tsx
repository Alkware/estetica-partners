import React, { useContext, useEffect } from 'react';
import { DollarSign, TrendingUp, Download, BadgeDollarSign } from 'lucide-react';
import { Progress } from '../ui/progress';
import { useAuthStore } from '@/stores/authStore';
import { useDate } from '@/hooks/useDate';
import { usePlanManagement } from '@/hooks/usePlanManagement';
import { useMetricStore } from '@/stores/metricStore';
import { ModalContext } from '@/context/ModalContext';
import { PopOver } from '../ui/modal/templates/PopOver';
import { PopUp } from '../ui/modal/templates/PopUp';
import { ModalRequestCommission } from './components/ModalRequestCommission';
import PixInfo from './components/PixInfo/PixInfo';
import { useMask } from '@/hooks/useMask';
const { newDate } = useDate();

export const Commissions: React.FC = () => {
  const { setModalContent } = useContext(ModalContext);
  const { partner } = useAuthStore();
  const { maskToMoney } = useMask();
  const { getCurrentActivePlan, isCommissionPaid } = usePlanManagement();
  const { metricData, refreshMetrics } = useMetricStore();

  useEffect(() => {
    if (!partner) return;
    // Refresh metrics when partner data is available
    refreshMetrics(partner, { isCommissionPaid, newDate, getCurrentActivePlan })
  }, [partner]);


  const handleRequestWithdrawals = () => {
    if (!partner) return;
    const existComissionToReceive = partner?.comissions.filter(comission => comission.available) || [];
    const unpaidAmount = existComissionToReceive.filter(comission => !partner?.withdrawals.find(withdrawn => withdrawn.partner_comissions_id.includes(comission.id)));

    if (!unpaidAmount?.length) {
      setModalContent({
        id: "dont-exit-comissions",
        component: <PopOver
          id='dont-exit-comissions'
          message='Vocẽ não tem nenhuma comissão disponível para receber'
          type='WARNING'
        />
      });
      return;
    }

    const existWithdrawnPending = partner?.withdrawals.some(withdrawn => !withdrawn.status)

    if (existWithdrawnPending) {
      setModalContent({
        id: "existWithdrawnPending",
        component: <PopOver
          id='existWithdrawnPending'
          message='Você já tem uma solicitação de saque pendente, espere a confirmação para sacar novamente!'
          type='WARNING'
        />
      });
      return;
    }

    setModalContent({
      id: 'success_comissions',
      component: <PopUp>
        <ModalRequestCommission
          modalId='success_comissions'
          partnerId={partner.id}
          commissionsAvailable={unpaidAmount}
        />
      </PopUp>
    })


  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h2 className="text-2xl font-bold text-[#444]">Minhas Comissões</h2>
        <button
          className="cursor-pointer bg-gradient-to-r whitespace-nowrap from-[#00c8ff] to-[#0d96eb] text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          onClick={handleRequestWithdrawals}
        >
          <Download size={20} />
          Solicitar Saque
        </button>
      </div>

      {/* Summary Cards */}
      <div className="w-full flex flex-col-reverse md:flex-row  gap-4">
        <div className="w-full flex flex-col gap-4 items-center bg-white p-6 rounded-2xl shadow-md">
          <div className='w-full my-2'>
            <h2 className="text-xl font-bold text-text text-center sm:text-left">Meta de usuários ativos</h2>
            <h3 className='text-text text-center sm:text-left'>
              Indique 50 usuários ativos e ganhe
              <span className='text-green-700 font-bold'> 100 Reais </span>
              de bônus!
            </h3>
          </div>

          <div className="w-full space-y-2">
            <Progress
              value={metricData.activeUsers?.length || 0}
              className='w-full px-4 h-6'
            />
            <span className='mt-1 block w-full font-semibold text-center text-primary-hover'>{(metricData.activeUsers?.length || 0)} / 50</span>
          </div>
        </div>

        <div className="w-full">
          <PixInfo />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <DollarSign size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Gerado</p>
              <p className="text-2xl font-bold text-[#444]">{maskToMoney(metricData.totalCommissions)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-orange-100 rounded-xl">
              <TrendingUp size={24} className="text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Disponível</p>
              <p className="text-2xl font-bold text-[#444]">{maskToMoney(metricData.comissionAvailable)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <BadgeDollarSign size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Valor Debitado</p>
              <p className="text-2xl font-bold text-[#444]">
                {maskToMoney(metricData.totalWithdrawals)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Commissions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-[#444]">Histórico de Pagamentos</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Data</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Valor</th>
                <th className="text-center py-3 px-6 text-sm font-medium text-gray-600">Status</th>
                <th className="text-center py-3 px-6 text-sm font-medium text-gray-600">comprovante</th>
              </tr>
            </thead>
            <tbody>
              {partner?.withdrawals.map((withdrawal) => (
                <tr
                  key={withdrawal.id}
                  data-ispaid={withdrawal.status}
                  className="border-b border-gray-50 hover:bg-gray-50/50 data-[ispaid=true]:cursor-pointer"

                >
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {newDate(withdrawal.created_at).format('DD/MM/YYYY')}
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-medium text-[#444]">
                      {maskToMoney(partner.comissions.reduce((total, commission) =>
                        total + (withdrawal.partner_comissions_id.includes(commission.id) ? commission.commission_value : 0),
                        0) || 0)}
                    </p>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${withdrawal.status
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                      }`}>
                      {withdrawal.status ? 'Pago' : 'Pendente'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center flex justify-center">
                    {withdrawal.proof_of_payment ?
                      <img
                        src={withdrawal.proof_of_payment}
                        alt='comprovante de pagamento'
                        className='size-16 object-cover'
                      />
                      :
                      <span className="px-3 py-1 rounded-full text-xs font-medium">
                        Não disponível
                      </span>
                    }
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