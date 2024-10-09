import styled from "@emotion/styled";
import TitleOverlay from "@/components/TitleOverlay";
import { ReactNode } from "react";
import { Type } from "@/types";

interface ImageProps {
  id: string;
  type: Type;
  children: ReactNode;
}

const ImageContainer = styled.div`
  align-items: center;
  background-color: #dadada;
  display: flex;
  height: 100%;
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const ImageElement = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const Image = ({ id, children, type }: ImageProps) => (
  <ImageContainer>
    <ImageElement
      src={`/portfolio/${type}/${id}`}
      alt={`Image with id ${id}`}
    />
    <TitleOverlay>{children}</TitleOverlay>
  </ImageContainer>
);

export default Image;
