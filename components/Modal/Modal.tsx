import FocusTrap from "focus-trap-react";
import Link from "next/link";
import styled from "@emotion/styled";
import { Expand, X } from "lucide-react";
import { ReactNode, useEffect } from "react";
import { useGlobal } from "@/contexts/GlobalContext";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 9999;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: white;
  box-shadow: 0px 2px 6px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  color: #000;
`;

const ActionButtons = styled.div`
  position: absolute;
  top: 0;
  right: -3rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    top: -3rem;
    left: 0;
    flex-direction: row;
  }
`;

const IconButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  background-color: rgba(128, 128, 128, 0.5);
  color: #fff;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(128, 128, 128, 0.7);
  }
`;

const IconLink = styled(Link)`
  display: block;
  padding: 0.5rem;
  background-color: rgba(128, 128, 128, 0.5);
  color: #fff;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(128, 128, 128, 0.7);
  }
`;

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children?: ReactNode;
  id?: string;
  detailsUrl?: string;
}

const Modal = ({ isOpen, onClose, children, id, detailsUrl }: ModalProps) => {
  const { setSelectedMedia } = useGlobal();

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

  const handleDetailsClick = () => {
    setSelectedMedia(null);
  };

  return (
    <FocusTrap
      active={isOpen}
      focusTrapOptions={{
        escapeDeactivates: false,
        allowOutsideClick: true,
        initialFocus: false,
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
          <ActionButtons>
            <IconButton onClick={onClose} aria-label="Close modal">
              <X size={24} />
            </IconButton>
            {detailsUrl && (
              <IconLink
                href={detailsUrl}
                aria-label="View full details"
                title="Open in new page"
                onClick={handleDetailsClick}
              >
                <Expand size={24} />
              </IconLink>
            )}
          </ActionButtons>
          {children}
        </ModalContent>
      </ModalOverlay>
    </FocusTrap>
  );
};

export default Modal;
