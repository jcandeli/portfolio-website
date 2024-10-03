import styled from "@emotion/styled";
import Title from "@/components/Header";
import TitleOverlay from "@/components/TitleOverlay";
import { ReactNode } from "react";

interface ImageProps {
  id: string;
  direction: "top" | "left";
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

const Image = ({ id, children }: ImageProps) => (
  <ImageContainer>
    <ImageElement src={`/portfolio/photos/${id}`} alt={`Image with id ${id}`} />
    <TitleOverlay>{children}</TitleOverlay>
  </ImageContainer>
);

export default Image;
