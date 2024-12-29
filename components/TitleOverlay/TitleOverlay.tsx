import styled from "@emotion/styled";

const TitleOverlay = styled.figcaption`
  text-align: left;
  position: absolute;
  padding: 36px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  cursor: pointer;
  transform: translate(0, -16px);

  &:hover {
    opacity: 1;
    transform: translate(0, 0);
  }
  transition: opacity 600ms, transform 300ms;
`;

export default TitleOverlay;
