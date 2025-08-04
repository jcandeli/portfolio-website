"use client";
import styled from "@emotion/styled";
import { Roboto } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobal } from "@/contexts/GlobalContext";
import Modal from "@/components/Modal";
import { createMediaDetailsUrl } from "@/utils/url";
import MediaDetails from "@/components/MediaDetails/MediaDetails";

const roboto = Roboto({
  weight: ["400"],
  subsets: ["latin"],
  display: "block",
  preload: true,
});

interface BodyProps {
  isDarkMode: boolean;
}

const Body = styled.body<BodyProps>`
  --primary: ${({ isDarkMode }) => (isDarkMode ? "#f1f1f1" : "#121212")};
  --secondary: ${({ isDarkMode }) => (isDarkMode ? "#121212" : "#f1f1f1")};
  color: var(--primary);
  background-color: var(--secondary);
`;

const ModalContent = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    max-width: 90vw;
  }
`;

const ImageCaption = styled.figcaption`
  width: 100%;
  align-self: flex-start;
  padding: 2rem;
  position: relative;
`;

const Image = styled.img`
  object-fit: cover;
  max-width: min(90vw, 1200px);
  max-height: 70vh;
`;

const VideoFrame = styled.iframe`
  width: min(90vw, 1200px);
  height: min(70vh, calc(90vw * 9 / 16));
  max-width: 100%;
`;

export function StyledBody({ children }: { children: React.ReactNode }) {
  const { isDarkMode, selectedMedia, setSelectedMedia } = useGlobal();

  const handleCloseModal = () => {
    setSelectedMedia(null);
  };

  return (
    <Body isDarkMode={isDarkMode} className={roboto.className}>
      {children}
      <AnimatePresence mode="wait">
        {selectedMedia && (
          <Modal
            isOpen
            onClose={handleCloseModal}
            aria-label={`${selectedMedia.title} details`}
            id="media-modal"
            detailsUrl={createMediaDetailsUrl(
              selectedMedia.type,
              selectedMedia.title,
              selectedMedia.id
            )}
          >
            <motion.div
              key={selectedMedia.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.3,
              }}
            >
              <ModalContent>
                {selectedMedia.type === "video" ? (
                  <VideoFrame
                    title="YouTube Video Player"
                    src={`https://www.youtube.com/embed/${selectedMedia.id}?autoplay=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <Image
                    src={`/portfolio/${selectedMedia.type}/${selectedMedia.id}`}
                    alt={`${selectedMedia.title}`}
                  />
                )}
                <ImageCaption>
                  <MediaDetails media={selectedMedia} />
                </ImageCaption>
              </ModalContent>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </Body>
  );
}
