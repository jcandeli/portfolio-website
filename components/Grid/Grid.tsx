import styled from "@emotion/styled";

const GRID_COLS = 3;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr; /* default to one column on mobile */
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(${GRID_COLS}, 1fr);
  }
`;

export default Grid;