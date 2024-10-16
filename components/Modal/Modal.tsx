import { ReactNode, useEffect } from "react";
import styled from "@emotion/styled";
import { X } from "lucide-react";
import FocusTrap from "focus-trap-react";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(32px);
  z-index: 9999;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
`;

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children?: ReactNode;
  id?: string;
}

const Modal = ({ isOpen, onClose, children, id }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // make background not scrollable
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <FocusTrap
      active={isOpen}
      focusTrapOptions={{
        escapeDeactivates: false,
        allowOutsideClick: true,
      }}
    >
      <ModalOverlay
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
      >
        <ModalContent
          onClick={(e) => e.stopPropagation()}
          id={id}
          role="document"
        >
          <CloseButton onClick={onClose} aria-label="Close modal">
            <X size={24} />
          </CloseButton>
          {children}
        </ModalContent>
      </ModalOverlay>
    </FocusTrap>
  );
};

export default Modal;
