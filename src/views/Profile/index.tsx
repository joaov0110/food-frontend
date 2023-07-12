import { FC } from "react";
import CoverImage from "../../components/CoverImage";
import ProfileImage from "../../components/ProfileImage";
import { Box, Skeleton } from "@mui/material";
import useUser from "../../hooks/useUser";

import "./index.scss";

const Profile: FC = () => {
  const {
    user: { isLoading, isError, data },
  } = useUser();

  if (isLoading || isError) {
    return <Skeleton variant="circular" width={40} height={40} />;
  }

  return (
    <div className="profile__settings">
      <CoverImage />
      <Box className="profile__settings__image">
        <ProfileImage />
      </Box>
    </div>
  );
};

export default Profile;
