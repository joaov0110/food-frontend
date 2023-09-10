import { FC } from "react";
import { Box } from "@mui/material";
import { PhotoCameraBack } from "@mui/icons-material";

import "./index.scss";

const CoverImage: FC = () => {
  return (
    <Box className="cover__container">
      <img
        className="cover__image"
        src="https://www.bookhubpublishing.com/wp-content/uploads/revslider/the7-book-header/bg-slider-book-1500x750.jpg"
        alt="bg image"
      />
      <div className="cover__overlay">
        <PhotoCameraBack color="primary" />
      </div>
    </Box>
  );
};

export default CoverImage;
