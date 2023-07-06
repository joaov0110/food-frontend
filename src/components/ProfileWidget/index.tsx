import "./index.scss";

import { FC } from "react";

import { Avatar, Skeleton } from "@mui/material";

import useUser from "../../hooks/useUser";

const ProfileWidget: FC = () => {
  const {
    user: { isLoading, isError, data },
  } = useUser();

  if (isLoading || isError) {
    return <Skeleton variant="rectangular" width={210} height={60} />;
  }

  return (
    <div className="profile-widget">
      <Avatar
        className="profile-container__avatar"
        src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
        alt="profile picture"
      />
      <p className="profile-widget__userName">{data?.name}</p>
    </div>
  );
};

export default ProfileWidget;
