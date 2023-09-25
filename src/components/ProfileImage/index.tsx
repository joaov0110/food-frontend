import { FC } from "react";
import { Box } from "@mui/material";
import { PhotoCameraBack } from "@mui/icons-material";

import "./index.scss";

interface IprofileImage {
  image: string;
}

const ProfileImage: FC<IprofileImage> = ({ image }) => {
  return (
    <Box className="profileImage__container">
      <img className="profileImage__image" src={image} alt="bg image" />
      <div className="profileImage__overlay">
        <PhotoCameraBack color="primary" />
      </div>
    </Box>
  );
};

export default ProfileImage;
