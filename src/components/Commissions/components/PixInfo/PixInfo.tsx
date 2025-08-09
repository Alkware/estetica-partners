import { PopUp } from '@/components/ui/modal/templates/PopUp';
import { ModalContext } from '@/context/ModalContext';
import { useAuthStore } from '@/stores/authStore';
import { Plus } from 'lucide-react';
import { useContext } from 'react';
import { FomrCreatePixInfo } from './components/FormCreatePixInfo/FormCreatePixInfo';
import { PopOver } from '@/components/ui/modal/templates/PopOver';


const PixInfo = () => {
    const { setModalContent } = useContext(ModalContext)
    const partner = useAuthStore(store => store.partner);
    const hasPix = !!partner?.pix_info?.length;
    const MAX_PIX_KEY = 10;

    function handleRegisterPixKey() {
        if (!partner?.tag_id) return;

        if (partner.pix_info.length >= MAX_PIX_KEY) {
            setModalContent({
                id: 'error-limit-key-pix',
                component: <PopOver 
                    id='error-limit-key-pix'
                    message='Você atingiu o limite de chaves cadastradas'
                    type='WARNING'
                />
            });
            return;
        }

        setModalContent({
            id: 'create-pix-info',
            component: <PopUp>
                <FomrCreatePixInfo
                    tagId={partner?.tag_id}
                    modalId='create-pix-info'
                />
            </PopUp>
        })
    }

    return (
        <div className="max-w-[480px] h-full bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-primary-hover">Dados do PIX</h2>

            {!hasPix ? (
                <div className="text-center">
                    <p className="text-gray-600 mb-4">Você ainda não cadastrou nenhuma chave PIX.</p>
                    <button
                        className="bg-primary cursor-pointer hover:bg-primary-active text-white font-semibold py-2 px-4 rounded-xl transition"
                        onClick={handleRegisterPixKey}
                    >
                        Cadastrar chave PIX
                    </button>
                </div>
            ) : (
                <div>
                    <div className="flex overflow-x-auto space-x-4 pb-2 scroll-smooth snap-x">
                        {partner?.pix_info.map((pix, index, array) => (
                            <div
                                key={index}
                                data-isunique={array.length === 1}
                                className="data-[isunique=true]:w-full w-4/5 border border-gray-200 rounded-xl p-4 bg-[#F5F5F5] shrink-0 snap-center"
                            >
                                <p><span className="font-semibold text-[#1A1A1A]">Tipo:</span> {pix.type}</p>
                                <p><span className="font-semibold text-[#1A1A1A]">Chave:</span> {pix.key}</p>
                                <p><span className="font-semibold text-[#1A1A1A]">Banco:</span> {pix.bank}</p>
                                <p><span className="font-semibold text-[#1A1A1A]">Destinatário:</span> {pix.ownerName}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 text-right w-full flex justify-end">
                        <button
                            data-display={partner.pix_info.length < MAX_PIX_KEY}
                            className="data-[display=false]:hidden bg-gradient-to-r flex items-center from-primary cursor-pointer to-primary-hover hover:bg-[#e57700] text-white font-semibold py-2 px-4 rounded-xl transition"
                            onClick={handleRegisterPixKey}
                        >
                            <Plus />
                            Adicionar nova chave
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PixInfo;
