import styled from "@emotion/styled";

const TitleOverlay = styled.div`
  position: absolute;
  padding: 36px 0 0 36px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
  transition: 600ms;
`;

export default TitleOverlay;
