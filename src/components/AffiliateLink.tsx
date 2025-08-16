import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuthStore } from '@/stores/authStore';
const VITE_URL = import.meta.env.VITE_API_URL;

interface AffiliateLinkProps {
  summarized?: boolean
}

export const AffiliateLink: React.FC<AffiliateLinkProps> = ({ summarized }) => {
  const { partner } = useAuthStore();
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const affiliateUrl = partner ?
    VITE_URL?.includes("wpz-hom") ?
      `https://api.wpz-hom.wipzee.com/partner_link/${partner.tag_id}` :
      VITE_URL?.includes("wipzee") ?
        `https://link.wipzee.com/${partner.id}` :
        "http://localhost:3334/partner_link/" + partner.tag_id : "Falha ao tentar carregar o link";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(affiliateUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  return (
    <div
      data-summarized={!!summarized}
      className="bg-white rounded-xl group  p-6 data-[summarized=true]:p-[.3rem_1.5rem] shadow-sm border border-gray-100"
    >
      <h3 className="text-lg font-bold text-[#444] mb-4 group-data-[summarized=true]:mb-0">Link de Afiliado</h3>

      {
        !partner?.is_active ?
          <p className="text-sm text-gray-600 mb-2">Sua conta ainda não está ativada!</p>
          :
          <div className="group-data-[summarized=true]:space-y-2 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <>
                <p className="text-sm text-gray-600 mb-2">Seu link único:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs bg-white p-2 rounded border text-[#444] break-all">
                    {affiliateUrl}
                  </code>
                </div>
              </>
            </div>

            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-[#00c8ff] to-[#0d96eb] text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copiar
                  </>
                )}
              </button>

              <button
                onClick={() => setShowQR(!showQR)}
                className="group-data-[summarized=true]:hidden px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                <QRCodeSVG
                  value={affiliateUrl}
                  size={16}
                />
              </button>

              <a
                href={affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                <ExternalLink size={16} />
              </a>
            </div>

            {showQR && (
              <div className="flex justify-center p-4 bg-gray-50 rounded-lg">
                <QRCodeSVG
                  value={affiliateUrl}
                  size={150}
                  level="M"
                />
              </div>
            )}

            <div
              className="text-xs text-gray-500 space-y-1 group-data-[summarized=true]:hidden"
            >
              <p>• Compartilhe este link para ganhar comissões</p>
              <p>• Comissão por cada usuário ativo indicado</p>
              <p>• Pagamento mensal via PIX</p>
            </div>
          </div>
      }
    </div>
  );
};