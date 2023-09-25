import "./index.scss";

import { FC } from "react";

import { Avatar, Skeleton } from "@mui/material";

import useUser from "../../hooks/useUserClient";
import { useQuery } from "react-query";
import { GET_USER } from "../../constants/queries";
import { renderProfileImages } from "../../utils/renderProfileImages";

const ProfileWidget: FC = () => {
  const { fetchUser } = useUser();

  const { isLoading, isError, data } = useQuery({
    queryKey: [GET_USER],
    queryFn: fetchUser,
  });

  if (isLoading || isError) {
    return <Skeleton variant="rectangular" width={210} height={60} />;
  }

  return (
    <div className="profile-widget">
      <Avatar
        className="profile-container__avatar"
        src={renderProfileImages(data?.image_url)}
        alt="profile picture"
      />
      <p className="profile-widget__userName">{data?.name}</p>
    </div>
  );
};

export default ProfileWidget;
