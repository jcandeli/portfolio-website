"use client";

import { useState, DragEvent } from "react";
import styled from "@emotion/styled";
import { Media } from "@/types";
import Grid, { GridItem } from "@/components/Grid";
import MediaCard from "@/components/MediaCard";
import mediaData from "@/data/media.json";
import { motion, AnimatePresence } from "framer-motion";

const AdminContainer = styled.div`
  padding: 2rem;
`;

const DraggableItem = styled(motion.div)`
  cursor: move;
  height: 100%;
  width: 100%;
`;

const JsonTextarea = styled.textarea`
  width: 100%;
  height: 200px;
  margin-top: 2rem;
`;

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 15, stiffness: 100 },
  },
};

export default function AdminPage() {
  const [mediaItems, setMediaItems] = useState<Media[]>(mediaData as Media[]);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, targetIndex: number) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
    const newItems = [...mediaItems];
    const [removed] = newItems.splice(sourceIndex, 1);
    newItems.splice(targetIndex, 0, removed);
    setMediaItems(newItems);
  };

  const handleRandomize = () => {
    setMediaItems((prevItems) => {
      const newItems = [...prevItems];
      for (let i = newItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newItems[i], newItems[j]] = [newItems[j], newItems[i]];
      }
      return newItems;
    });
  };

  return (
    <AdminContainer>
      <h1>Admin Page</h1>
      <button onClick={handleRandomize}>Randomize Order</button>
      <div style={{ marginTop: "1rem" }}>
        <Grid>
          <AnimatePresence>
            {mediaItems.map((item, index) => (
              <GridItem
                key={item.id}
                orientation={
                  item.type === "photo" ||
                  item.type === "design" ||
                  item.type === "video"
                    ? item.orientation
                    : undefined
                }
              >
                <DraggableItem
                  variants={item}
                  draggable
                  onDragStart={(e: DragEvent<HTMLDivElement>) =>
                    handleDragStart(e, index)
                  }
                  onDragOver={handleDragOver}
                  onDrop={(e: DragEvent<HTMLDivElement>) =>
                    handleDrop(e, index)
                  }
                >
                  <div className="h-full w-full">
                    <MediaCard media={item} />
                  </div>
                </DraggableItem>
              </GridItem>
            ))}
          </AnimatePresence>
        </Grid>
      </div>
      <JsonTextarea value={JSON.stringify(mediaItems, null, 2)} readOnly />
    </AdminContainer>
  );
}
