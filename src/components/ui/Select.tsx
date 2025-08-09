import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";

type Option = {
    label: string;
    value: string;
};

export type SelectModalProps = {
    formName: string
    options: Option[];
    selected?: string;
    title?: string
    onSelect?: (value: string) => void;
    searchable?: boolean; // se true, mostra o campo de busca
};

export function SelectModal({ formName, options, selected, onSelect, title, searchable = false }: SelectModalProps) {
    const [open, setOpen] = useState(false);
    const [select, setSelect] = useState({ selected: title || "Selecione...", options });
    const ref = useRef<HTMLDivElement>(null);
    const form = useFormContext();

    function handleSelectOption(option: string) {
        const selectedOption = options.find(opt => opt.label === option || opt.value === option);
        console.log(selectedOption)
        if (!selectedOption) return;

        form.unregister(formName);
        form.register(formName, { value: selectedOption.value })
        setSelect(value => ({ ...value, selected: selectedOption?.label }));
        setOpen(false);
        onSelect && onSelect(selectedOption.value);
    }

    function handleSearchValue(text: string) {
        if (!text.length) {
            setSelect(value => ({ ...value, options }));
        } else {
            setSelect(value => ({
                ...value,
                options: value.options.filter(opt => opt.value.toLowerCase().includes(text) || opt.label.toLowerCase().includes(text))
            }));
        }
    }

    // Valor padrão da inicialização do select
    useEffect(() => { selected && handleSelectOption(selected) }, [selected])

    // Fecha o dropdown ao clicar fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [selected]);


    return (
        <div ref={ref} className="relative w-full">
            {/* Botão principal */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-3 text-left text-gray-700 bg-white focus:outline-none focus:ring focus:ring-blue-300"
            >
                {select.selected}
                <ChevronDown className="size-4" />
            </button>

            {/* Dropdown */}
            {open && (
                <div className="w-full absolute z-10 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {/* Input de busca dentro do dropdown */}
                    {searchable && (
                        <div className="p-2 sticky top-0 bg-white border-b">
                            <input
                                autoFocus
                                type="text"
                                placeholder="Buscar..."
                                onChange={(e) => handleSearchValue(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none"
                            />
                        </div>
                    )}

                    {/* Opções */}
                    {select.options.length > 0 ? (
                        select.options.map((opt) => (
                            <div
                                key={opt.value}
                                onClick={() => handleSelectOption(opt.value)}
                                className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                            >
                                {opt.label}
                            </div>
                        ))
                    ) : (
                        <div className="px-4 py-2 text-gray-400 text-sm">Nenhuma opção encontrada</div>
                    )}
                </div>
            )}

            <span
                data-display={!!form.formState.errors[formName]}
                className='text-red-600 data-[display=false]:hidden text-xs whitespace-nowrap absolute top-[105%]'
            >{form.formState.errors[formName]?.message?.toString()}</span>
        </div>
    );
}
