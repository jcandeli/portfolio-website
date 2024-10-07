"use client";

import { useState, useEffect, DragEvent } from "react";
import styled from "@emotion/styled";
import { Media } from "@/types";
import MediaGrid from "@/components/MediaGrid";
import Grid, { GridItem } from "@/components/Grid";
import MediaCard from "@/components/MediaCard";

const AdminContainer = styled.div`
  padding: 2rem;
`;

const DraggableItem = styled(GridItem)`
  cursor: move;
  border: 1px solid #ccc;
  padding: 0.5rem;
`;

const JsonTextarea = styled.textarea`
  width: 100%;
  height: 200px;
  margin-top: 2rem;
`;

export default function AdminPage() {
  const [mediaItems, setMediaItems] = useState<Media[]>([]);

  useEffect(() => {
    fetch("/api/media")
      .then((res) => res.json())
      .then((data) => setMediaItems(data));
  }, []);

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

  return (
    <AdminContainer>
      <h1>Admin Page</h1>
      <div style={{ maxWidth: 960 }}>
        <Grid>
          {mediaItems.map((item, index) => (
            <DraggableItem
              key={item.id}
              orientation={item.orientation}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <GridItem key={item.id} orientation={item.orientation}>
                <MediaCard media={item} onClick={() => {}} />
              </GridItem>
            </DraggableItem>
          ))}
        </Grid>
      </div>
      <JsonTextarea value={JSON.stringify(mediaItems, null, 2)} readOnly />
    </AdminContainer>
  );
}
