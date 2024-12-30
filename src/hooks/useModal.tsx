import { useCallback, useState } from "react";

// Define the available modal types
type ModalType = "primary" | "success" | "error" | "base";

// Define the hook to manage modal state and type
function useModal(
  initialType: ModalType = "primary",
  title?: string,
  message?: string,
  buttonText?: string,
  explanation?: string,
  onClose?: () => void
) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type, setType] = useState<ModalType>(initialType);
  const [modalContent, setModalContent] = useState({
    title: title,
    message: message,
    buttonText: buttonText,
  });

  const setContent = useCallback(
    (
      type: ModalType = "primary",
      title: string,
      message: string,
      buttonText: string
    ) => {
      setType(type);
      setModalContent({
        title: title,
        message: message,
        buttonText: buttonText,
      });
    },
    []
  );

  const openModal = useCallback((modalType?: ModalType) => {
    if (modalType) {
      setType(modalType); // Set the modal type if provided
    }
    setIsOpen(true); // Open the modal
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false); // Close the modal
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  // The modal component to be returned by the hook
  const ModalComponent = (
    <>
      {isOpen && (
        <dialog id="my_modal_1" className="modal w-fit mx-auto" open>
          <div
            className={`modal-box max-w-[1000px] border-4 ${
              type === "primary"
                ? "border-primary"
                : type === "success"
                ? "border-success"
                : type === "error"
                ? "border-error"
                : type === "base"
                ? "text-base-content"
                : ""
            }`}
          >
            <h3 className="font-bold text-lg">{modalContent.title}</h3>
            {explanation && (
              <div>
               <img src={explanation} alt="story image" className="h-[400px] w-auto mx-auto"/> 
              </div>
            )}
            <p className="py-4 font-bold">{modalContent.message}</p>
            <div className="modal-action">
              {/* Button to close the modal */}
              <button
                className={`btn ${
                  type === "primary"
                    ? "btn-primary"
                    : type === "success"
                    ? "btn-success"
                    : type === "error"
                    ? "btn-error"
                    : type === "base"
                    ? "btn-base"
                    : ""
                }
              }`}
                onClick={closeModal}
              >
                {modalContent.buttonText}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );

  return {
    isOpen,
    openModal,
    closeModal,
    ModalComponent,
    setContent,
  };
}

export default useModal;
