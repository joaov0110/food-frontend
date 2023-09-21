import { CircularProgress, Box } from "@mui/material";
import { FC } from "react";

interface ICircularSpinner {
  size?: number;
}

const cirularBoxStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100vh",
};

const CircularSpinner: FC<ICircularSpinner> = ({ size }) => {
  return (
    <Box sx={cirularBoxStyles}>
      <CircularProgress size={size} />
    </Box>
  );
};

export default CircularSpinner;
