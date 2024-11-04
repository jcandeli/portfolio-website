import { Media } from "@/types";

export function arrangeGrid(filteredItems: Media[]) {
  // Separate items by aspect ratio
  const horizontalItems: Media[] = [];
  const verticalItems: Media[] = [];
  const squareItems: Media[] = [];
  filteredItems.forEach((item) => {
    if ("orientation" in item) {
      if (item.orientation === "horizontal") horizontalItems.push(item);
      else if (item.orientation === "vertical") verticalItems.push(item);
      else squareItems.push(item);
    } else {
      squareItems.push(item); // Default to square for items without orientation
    }
  });

  const finalGrid = [];
  let currentRowWidth = 0;
  let rowStartIndex = 0;

  // Loop until all items are placed
  while (
    horizontalItems.length > 0 ||
    verticalItems.length > 0 ||
    squareItems.length > 0
  ) {
    let added = false;

    // Check what will fit based on the remaining space in the row
    if (currentRowWidth === 0) {
      // Start of a new row, rotate between different item types
      if (rowStartIndex % 3 === 0 && horizontalItems.length > 0) {
        finalGrid.push(horizontalItems.shift());
        currentRowWidth += 2;
        added = true;
      } else if (rowStartIndex % 3 === 1 && verticalItems.length > 0) {
        finalGrid.push(verticalItems.shift());
        currentRowWidth += 1;
        added = true;
      } else if (rowStartIndex % 3 === 2 && squareItems.length > 0) {
        finalGrid.push(squareItems.shift());
        currentRowWidth += 1;
        added = true;
      } else {
        // If preferred item type is not available, use any available type
        if (horizontalItems.length > 0) {
          finalGrid.push(horizontalItems.shift());
          currentRowWidth += 2;
          added = true;
        } else if (verticalItems.length > 0) {
          finalGrid.push(verticalItems.shift());
          currentRowWidth += 1;
          added = true;
        } else if (squareItems.length > 0) {
          finalGrid.push(squareItems.shift());
          currentRowWidth += 1;
          added = true;
        }
      }
    } else if (currentRowWidth === 1) {
      // 2 columns remaining, try to add horizontal or two squares
      if (horizontalItems.length > 0) {
        finalGrid.push(horizontalItems.shift());
        currentRowWidth += 2;
        added = true;
      } else if (squareItems.length >= 2) {
        finalGrid.push(squareItems.shift());
        finalGrid.push(squareItems.shift());
        currentRowWidth += 2;
        added = true;
      } else if (verticalItems.length > 0) {
        finalGrid.push(verticalItems.shift());
        currentRowWidth += 1;
        added = true;
      }
    } else if (currentRowWidth === 2) {
      // 1 column remaining, try to add a square or vertical
      if (squareItems.length > 0) {
        finalGrid.push(squareItems.shift());
        currentRowWidth += 1;
        added = true;
      } else if (verticalItems.length > 0) {
        finalGrid.push(verticalItems.shift());
        currentRowWidth += 1;
        added = true;
      }
    }

    // If the row is filled or no item could be added, reset for the next row
    if (currentRowWidth >= 3 || !added) {
      currentRowWidth = 0;
      rowStartIndex++;
    }
  }

  return finalGrid;
}
