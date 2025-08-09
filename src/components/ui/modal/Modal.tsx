import { useContext } from "react";
import { ModalContext } from "../../../context/ModalContext";

export function Modal() {
    const { modalContent } = useContext(ModalContext);

    return (
        modalContent?.map((modal) =>
            modal.component &&
            <div
                key={modal.id}
                data-render="renderizou?"
                className="w-screen h-screen overflow-hidden backdrop-blur-sm fixed top-0 right-0 flex justify-end z-50"
            >
                {modal.component}
            </div>
        )
    )
};