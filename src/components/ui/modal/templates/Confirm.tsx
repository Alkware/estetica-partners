import { twMerge } from "tailwind-merge";
import { Button } from "../../Button/Button";

interface Confirm {
    title: string,
    subTitle?: string;
    confirmFunction: () => void,
    cancelFuntion: () => void,
    className?: string;
}

export function Confirm({ title, subTitle, confirmFunction, cancelFuntion, className }: Confirm) {
    return (
        <div
            className="w-screen h-screen  grid place-items-center text-dark border rounded-md relative "
        >
            <div className={twMerge("max-w-[90vw] rounded-md flex flex-col items-center gap-8 p-4 bg-light animation-scale-in", className)}>
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-medium text-center">{title}</h2>
                    <h3
                        data-display={!!subTitle}
                        className="opacity-80 data-[display=false]:hidden text-center"
                    >{subTitle}</h3>
                </div>
                <div className="w-full flex gap-4 justify-evenly ">

                    <Button onClick={confirmFunction}>Sim</Button>

                    <button
                        onClick={cancelFuntion}
                        className="underline opacity-60"
                    >Cancelar</button>
                </div>
            </div>
        </div>
    )
};