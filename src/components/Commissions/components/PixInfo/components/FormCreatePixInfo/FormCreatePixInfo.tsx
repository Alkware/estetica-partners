import { updatePartner } from "@/api/partner.api";
import { PopOver } from "@/components/ui/modal/templates/PopOver";
import { SelectModal } from "@/components/ui/Select";
import { ModalContext } from "@/context/ModalContext";
import { useMask } from "@/hooks/useMask";
import { pixInfoSchema, PixInfoType } from "@/schemas/pixInfo.schema";
import { useAuthStore } from "@/stores/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SelectBank } from "./components/SelectBank";

type FomrCreatePixInfoProps = {
    tagId: string,
    modalId: string
};

export function FomrCreatePixInfo({ modalId, tagId }: FomrCreatePixInfoProps) {
    const { clearModal, setModalContent } = useContext(ModalContext);
    const [isLoading, setIsLoading] = useState(false);
    const { authenticate } = useAuthStore();
    const { maskToPixKey } = useMask();
    const form = useForm<PixInfoType>({
        resolver: zodResolver(pixInfoSchema)
    });

    async function handleRegister(data: PixInfoType) {
        setIsLoading(true);

        const response = await updatePartner(tagId, { pix_info: [data] });

        if (!response.success) {
            setModalContent({
                id: "error-add-pix",
                component: <PopOver
                    id="error-add-pix"
                    message="Ocorreu um erro ao tentar adicionar seu pix, por favor, tente mais tarde!"
                    type="WARNING"
                    functionAfterComplete={() => clearModal(modalId)}
                />
            })
        }

        authenticate();
        clearModal(modalId);
    }

    return (
        <div className="w-screen max-w-[480px] h-screen md:h-4/5 rounded bg-white p-4 relative">
            <X
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => clearModal(modalId)}
            />
            <FormProvider {...form}>
                <form
                    onSubmit={form.handleSubmit(handleRegister)}
                    className="space-y-6"
                >

                    <div className="flex gap-2 items-end">
                        <div>
                            <label className="block text-sm font-medium text-[#444] mb-2">
                                Chave PIX
                            </label>
                            <input
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00c8ff] focus:border-transparent transition-all duration-200"
                                placeholder="Digite sua chave"
                                {...form.register("key", { onChange: (e) => { e.target.value = maskToPixKey(e.target.value).value } })}
                                required
                            />
                            <span
                                data-display={!!form.formState.errors["key"]}
                                className='text-red-600 data-[display=false]:hidden text-sm'
                            >{form.formState.errors["key"]?.message}</span>
                        </div>


                        <div>
                            <SelectModal
                                formName="type"
                                onSelect={() => { }}
                                selected={form.watch("key") && maskToPixKey(form.watch("key")).type}
                                options={[
                                    { label: "CPF", value: "CPF" },
                                    { label: "CNPJ", value: "CNPJ" },
                                    { label: "Telefone", value: "Telefone" },
                                    { label: "Email", value: "Email" },
                                    { label: "Aleatória", value: "Chave Aleatória" },
                                ]}
                            />

                        </div>
                    </div>


                    <SelectBank
                        formName="bank"
                        options={[]}
                    />

                    <div>
                        <label className="block text-sm font-medium text-[#444] mb-2">
                            Nome da chave
                        </label>
                        <input
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00c8ff] focus:border-transparent transition-all duration-200"
                            placeholder='Maria Dolores Cunha'
                            {...form.register("ownerName")}
                            required
                        />
                        <span
                            data-display={!!form.formState.errors["ownerName"]}
                            className='text-red-600 data-[display=false]:hidden text-sm'
                        >{form.formState.errors["ownerName"]?.message}</span>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full cursor-pointer bg-gradient-to-r from-[#00c8ff] to-[#0d96eb] text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : "Adicionar chave"
                        }
                    </button>
                </form>
            </FormProvider>
        </div>
    );
}