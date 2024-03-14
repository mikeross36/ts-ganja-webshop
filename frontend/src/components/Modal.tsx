import { useRef } from "react";
import { createPortal } from "react-dom";
import { FaWindowClose } from "react-icons/fa";
import { useOutsideClick } from "../hooks/useOutsideClick";

type PropsType = {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal: React.FC<PropsType> = ({
  children,
  showModal,
  setShowModal,
}): React.ReactPortal | null => {
  const modalRef = useRef(null);

  useOutsideClick(modalRef, function () {
    setShowModal(false);
  });

  if (!showModal) return null;
  return createPortal(
    <main className="modal__overlay">
      <div className="modal__conatainer" ref={modalRef}>
        <div className="modal__close" onClick={() => setShowModal(false)}>
          <FaWindowClose
            size={35}
            color="#000000"
            style={{ cursor: "pointer" }}
          />
        </div>
        {children}
      </div>
    </main>,
    document.getElementById("modal") as HTMLInputElement
  );
};

export default Modal;
