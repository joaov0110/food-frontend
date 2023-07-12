import { FC } from "react";
import { Box } from "@mui/material";
import { PhotoCameraBack } from "@mui/icons-material";

import "./index.scss";

const ProfileImage: FC = () => {
  return (
    <Box className="profileImage__container">
      <img
        className="profileImage__image"
        src="https://www.bookhubpublishing.com/wp-content/uploads/revslider/the7-book-header/bg-slider-book-1500x750.jpg"
        alt="bg image"
      />
      <div className="profileImage__overlay">
        <PhotoCameraBack color="primary" />
      </div>
    </Box>
  );
};

export default ProfileImage;
