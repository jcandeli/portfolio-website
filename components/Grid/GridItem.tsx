import styled, { StyledComponent } from "@emotion/styled";
import { Orinetation } from "@/types";

interface GridItemProps {
  orientation: Orinetation;
}

const GridItem: StyledComponent<"div", any, GridItemProps> = styled.div`
  grid-column: span 1;
  grid-row: span 1;
  width: 100%;

  @media (min-width: 768px) {
    grid-column: span
      ${({ orientation }) =>
        (orientation === "horizontal" && 2) ||
        (orientation === "block" && 2) ||
        (orientation === "banner" && 3)};
    grid-row: span
      ${({ orientation }) =>
        (orientation === "vertical" && 2) || (orientation === "block" && 2)};

    /* Set item to fill the entire grid cell */
    height: ${({ orientation }) =>
      (orientation === "vertical" && "auto") ||
      (orientation === "block" && "auto") ||
      "calc((min(100vw, 1400px) / 3) - 2rem)"};
  }
`;

export { GridItem };
