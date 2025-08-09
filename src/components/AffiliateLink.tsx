import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface AffiliateLinkProps {
  partnerId: string;
}

export const AffiliateLink: React.FC<AffiliateLinkProps> = ({ partnerId }) => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const affiliateUrl = window.location.href.includes("wipzee") ? `https://l.wipzee.com/${partnerId}` : "http://localhost:3334/partner_link/" + partnerId;

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
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-[#444] mb-4">Link de Afiliado</h3>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Seu link único:</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-xs bg-white p-2 rounded border text-[#444] break-all">
              {affiliateUrl}
            </code>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#00c8ff] to-[#0d96eb] text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
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
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
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

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Compartilhe este link para ganhar comissões</p>
          <p>• 30% de comissão em cada upgrade premium</p>
          <p>• Pagamento mensal via PIX</p>
        </div>
      </div>
    </div>
  );
};