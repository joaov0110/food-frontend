import "./index.scss";

import { FC } from "react";

import { Avatar } from "@mui/material";

const ProfileWidget: FC = () => {
  return (
    <div className="profile-widget">
      <Avatar
        className="profile-container__avatar"
        src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
        alt="profile picture"
      />
      <p className="profile-widget__userName">John doe</p>
    </div>
  );
};

export default ProfileWidget;
