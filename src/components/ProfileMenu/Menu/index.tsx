import { useState, forwardRef, useImperativeHandle } from "react";
import { Fade, Box, List, ListItem, ListItemText, Avatar } from "@mui/material";
import { renderProfileImages } from "../../../utils/renderProfileImages";

interface IMenu {
  children: React.ReactNode;
  data: {
    name: string;
    email: string;
    image_url: string | null;
  };
}

const menu = forwardRef(function Menu({ children, data }: IMenu, ref) {
  const { name, email, image_url } = data;

  const [showMenu, setShowMenu] = useState(false);

  const hideMenu = () => {
    setShowMenu(false);
  };

  useImperativeHandle(ref, () => ({
    hideMenu,
  }));

  const handleShowMenu = () => {
    setShowMenu((previousValue) => {
      return !previousValue;
    });
  };

  return (
    <>
      <Avatar
        className="profileMenu-container__avatar"
        src={renderProfileImages(image_url)}
        alt="profile picture"
        onClick={handleShowMenu}
      />

      <Fade in={showMenu}>
        <Box>
          <Box>
            <List
              className={`profileMenu-container__menu ${
                showMenu && "show-menu"
              }`}
              aria-label="navigation profile"
            >
              <ListItem className="profileMenu-container__info">
                <ListItemText className="profileMenu-container__info__userName">
                  {name}
                </ListItemText>
                <ListItemText className="profileMenu-container__info__userEmail">
                  {email}
                </ListItemText>
              </ListItem>

              {children}
            </List>
          </Box>
        </Box>
      </Fade>
    </>
  );
});

export default menu;
