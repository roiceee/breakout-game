import { useCallback, useState } from "react";

// Define the available modal types
type ModalType = "primary" | "success" | "error" | "base";

// Define the hook to manage modal state and type
function useModal(
  initialType: ModalType = "primary",
  title?: string,
  message?: string,
  buttonText?: string,
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
        <dialog id="my_modal_1" className="modal" open>
          <div
            className={`modal-box ${
              type === "primary"
                ? "bg-primary text-primary-content"
                : type === "success"
                ? "bg-success text-success-content"
                : type === "error"
                ? "bg-error text-error-content"
                : type === "base"
                ? "bg-base-100 text-base-content"
                : ""
            }`}
          >
            <h3 className="font-bold text-lg">{modalContent.title}</h3>
            <p className="py-4">{modalContent.message}</p>
            <div className="modal-action">
              {/* Button to close the modal */}
              <button className="btn" onClick={closeModal}>
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
