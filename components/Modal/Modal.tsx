import { ReactNode } from "react";
import styled from "@emotion/styled";
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
`;
const ModalContent = styled.div`
  position: relative;
  background-color: transparent;
  width: 100%;
  height: 100%;
  max-width: 85vw;
  max-height: 85vh;
  overflow-y: auto;
`;
interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children?: ReactNode;
}
const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <>
      {isOpen && (
        <ModalOverlay onClick={onClose}>
          <ModalContent onClick={onClose}>{children}</ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};
export default Modal;
