import { ReactElement, createContext, useState } from "react";


interface ProviderTypes {
    id: string,
    component: ReactElement
}

interface ModalContextTypes {
    modalContent: ProviderTypes[] | undefined,
    setModalContent: (props: ProviderTypes) => void,
    clearModal: (props: string | null, options?: { clearAll?: true, clearLast?: true }) => void,
}

export const ModalContext = createContext<ModalContextTypes>({
    modalContent: undefined,
    setModalContent: () => { },
    clearModal: () => { },
});

export function ModalProvider({ children }: { children: ReactElement | ReactElement[] }) {
    const [modalContent, setModal] = useState<ProviderTypes[]>([]);

    const setModalContent = ({ component, id }: ProviderTypes) => {
        setModal(values => [...values, { component, id }])
    }

    // Função criada para limpar os modals baseado no nome, caso não for passado um nome, ele limpa todos os modal
    const clearModal = async (componentName: string | null, options?: { clearAll?: true, clearLast?: true }) => {
        if (options?.clearAll) {
            setModal([])
            return
        }

        if (options?.clearLast) {
            setModal(values => {
                if (values) {
                    const array = [...values]
                    array.pop();
                    return array
                }
                return []
            })
            return
        }

        if (componentName) setModal(values => [...values].filter(value => value.id !== componentName))
        else {
            throw new Error("ComponentName cannot be empty.")
        }
    }

    return (
        <ModalContext.Provider value={{ modalContent, setModalContent, clearModal }}>
            {children}
        </ModalContext.Provider>
    )
};