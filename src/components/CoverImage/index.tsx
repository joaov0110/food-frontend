import { FC } from "react";
import { Box } from "@mui/material";
import { PhotoCameraBack } from "@mui/icons-material";
import "./index.scss";

interface IcoverImage {
  image: string;
}

const CoverImage: FC<IcoverImage> = ({ image }) => {
  return (
    <Box className="cover__container">
      <img className="cover__image" src={image} />
      <div className="cover__overlay">
        <PhotoCameraBack color="primary" />
      </div>
    </Box>
  );
};

export default CoverImage;
