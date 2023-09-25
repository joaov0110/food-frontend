import "./index.scss";

import { FC, useState } from "react";
import { useQuery } from "react-query";
import { renderProfileImages } from "../../utils/renderProfileImages";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Avatar,
  ClickAwayListener,
  Fade,
  Box,
  Skeleton,
} from "@mui/material";

import { Link } from "react-router-dom";

import useUser from "../../hooks/useUserClient";
import { GET_USER } from "../../constants/queries";

interface IshapeMenuItems {
  text: string;
  link: string;
  divider?: boolean;
}

const shapeMenuItems = (data: IshapeMenuItems) => {
  const { text, link, divider } = data;

  return {
    text,
    link,
    divider,
  };
};

const menuItems = [
  shapeMenuItems({ text: "Profile", link: "profile" }),
  shapeMenuItems({ text: "Logout", link: "/logout", divider: true }),
];

const ProfileMenu: FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  const { fetchUser } = useUser();

  const { isLoading, isError, data } = useQuery({
    queryKey: [GET_USER],
    queryFn: fetchUser,
  });

  const handleShowMenu = () => {
    setShowMenu((previousValue) => {
      return !previousValue;
    });
  };

  const handleHideMenu = () => {
    setShowMenu(false);
  };

  const renderMenuItems = () => {
    return menuItems.map((item) => {
      return (
        <div key={item.text}>
          {item.divider && <Divider />}
          <ListItem>
            <ListItemButton onClick={handleHideMenu}>
              <Link to={item.link}>
                <ListItemText>{item.text}</ListItemText>
              </Link>
            </ListItemButton>
          </ListItem>
        </div>
      );
    });
  };

  if (isLoading || isError) {
    return <Skeleton variant="circular" width={40} height={40} />;
  }

  return (
    <div className="profileMenu">
      <ClickAwayListener onClickAway={handleHideMenu}>
        <div className="profileMenu-container">
          <Avatar
            className="profileMenu-container__avatar"
            src={renderProfileImages(data?.image_url)}
            alt="profile picture"
            onClick={handleShowMenu}
          />

          <Fade in={showMenu}>
            <Box>
              <List
                className={`profileMenu-container__menu ${
                  showMenu && "show-menu"
                }`}
                aria-label="navigation profile"
              >
                <ListItem className="profileMenu-container__info">
                  <ListItemText className="profileMenu-container__info__userName">
                    {data?.name}
                  </ListItemText>
                  <ListItemText className="profileMenu-container__info__userEmail">
                    {data?.email}
                  </ListItemText>
                </ListItem>

                {renderMenuItems()}
              </List>
            </Box>
          </Fade>
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default ProfileMenu;
