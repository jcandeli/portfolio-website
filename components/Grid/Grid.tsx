import styled from "@emotion/styled";
import { motion } from "framer-motion";

const GRID_COLS = 3;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.5,
    },
  },
};

// First create the motion component, then style it
const MotionGrid = motion.div;
const Grid = styled(MotionGrid)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(${GRID_COLS}, 1fr);
  }
`;

Grid.defaultProps = {
  variants: container,
  initial: "hidden",
  animate: "show",
};

export default Grid;
