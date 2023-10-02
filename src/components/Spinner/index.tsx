import { CircularProgress, Box } from "@mui/material";
import { FC } from "react";

interface ICircularSpinner {
  size?: number;
  styles?: {
    [key: string]: string | number;
  };
}

const cirularBoxStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAling: "center",
  width: "100%",
  height: "100vh",
};

const CircularSpinner: FC<ICircularSpinner> = ({ size, styles }) => {
  return (
    <Box sx={{ ...cirularBoxStyles, ...styles }}>
      <CircularProgress size={size} />
    </Box>
  );
};

export default CircularSpinner;
