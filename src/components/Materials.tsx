import React from 'react';
import { Download, Copy, Share2, Instagram, MessageCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export const Materials: React.FC = () => {
  const socialPosts = [
    {
      id: 1,
      title: "Story para Instagram - Apresentação",
      description: "Apresente o Wipzee para seus seguidores",
      image: "https://images.pexels.com/photos/6953866/pexels-photo-6953866.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop"
    },
    {
      id: 2,
      title: "Post para Instagram - Benefícios",
      description: "Destaque os principais benefícios",
      image: "https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop"
    },
    {
      id: 3,
      title: "Banner para Stories - Promocional",
      description: "Banner promocional com seu link",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop"
    }
  ];

  const textTemplates = [
    {
      title: "Mensagem para WhatsApp",
      text: "🌟 Oi! Você conhece o Wipzee? É um app incrível que ajuda profissionais da estética a organizar seus agendamentos de forma super prática! Baixe pelo meu link e ganhe 7 dias premium grátis: https://wipzee.com.br/cadastro?ref=WP2024001"
    },
    {
      title: "Legenda para Instagram",
      text: "✨ Profissionais da estética, essa é para vocês! 📱\n\nConheçam o @wipzeeapp - o aplicativo que vai revolucionar a forma como vocês gerenciam seus agendamentos! 💅\n\n🎯 Organizem clientes\n⏰ Controlem horários\n💰 Aumentem a produtividade\n\nBaixem pelo meu link na bio e ganhem 7 dias premium grátis! 🎁\n\n#WipzeeApp #Estética #Agendamentos #Produtividade"
    }
  ];

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-[#444] mb-2">Materiais de Divulgação</h2>
          <p className="text-gray-600">Baixe materiais prontos para divulgar o Wipzee e aumentar suas indicações</p>
        </div>

        {/* QR Code Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#444] mb-4">QR Code do seu Link</h3>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-gray-50 p-4 rounded-xl">
              <QRCodeSVG
                value="https://wipzee.com.br/cadastro?ref=WP2024001"
                size={200}
                level="M"
                includeMargin
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-[#444] mb-2">Como usar:</h4>
              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                <li>• Imprima e cole em seu salão</li>
                <li>• Compartilhe em suas redes sociais</li>
                <li>• Adicione em cartões de visita</li>
                <li>• Use em materiais impressos</li>
              </ul>
              <button className="bg-gradient-to-r from-[#00c8ff] to-[#0d96eb] text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2">
                <Download size={20} />
                Baixar QR Code
              </button>
            </div>
          </div>
        </div>

        {/* Social Media Cards */}
        <div>
          <h3 className="text-lg font-bold text-[#444] mb-4">Cards para Redes Sociais</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="aspect-[4/5] bg-gradient-to-br from-[#00c8ff] to-[#0d96eb] relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover opacity-20"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-6">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <span className="text-2xl font-bold">W</span>
                      </div>
                      <h4 className="text-xl font-bold mb-2">{post.title}</h4>
                      <p className="text-sm opacity-90">{post.description}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-[#444] mb-2">{post.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{post.description}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-gradient-to-r from-[#00c8ff] to-[#0d96eb] text-white py-2 px-4 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
                      <Download size={16} />
                      Baixar
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Text Templates */}
        <div>
          <h3 className="text-lg font-bold text-[#444] mb-4">Textos Prontos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {textTemplates.map((template, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  {template.title.includes('WhatsApp') ? (
                    <MessageCircle size={20} className="text-green-600" />
                  ) : (
                    <Instagram size={20} className="text-pink-600" />
                  )}
                  <h4 className="font-medium text-[#444]">{template.title}</h4>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-700 whitespace-pre-line">{template.text}</p>
                </div>
                <button
                  onClick={() => copyText(template.text)}
                  className="w-full bg-gradient-to-r from-[#00c8ff] to-[#0d96eb] text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Copy size={16} />
                  Copiar Texto
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tutorial Section */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-[#444] mb-4">💡 Dicas de Divulgação</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-[#444] mb-2">Redes Sociais</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Poste nos stories diariamente</li>
                <li>• Use os cards prontos no feed</li>
                <li>• Responda comentários rapidamente</li>
                <li>• Mostre resultados reais</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-[#444] mb-2">WhatsApp e Presencial</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Compartilhe com clientes atuais</li>
                <li>• Cole o QR Code no salão</li>
                <li>• Mencione durante atendimentos</li>
                <li>• Crie grupos para profissionais</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  );
};