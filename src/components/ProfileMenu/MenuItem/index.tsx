import { FC, memo } from "react";
import { Divider, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

interface IprofileMenuItem {
  data: {
    id: number;
    text: string;
    link: string;
    divider?: boolean;
  };
  handleHideMenu: () => void;
}

const ProfileMenuItem: FC<IprofileMenuItem> = memo(
  ({ data, handleHideMenu }) => {
    const { text, link, divider } = data;

    return (
      <div>
        {divider && <Divider />}
        <ListItem>
          <ListItemButton onClick={handleHideMenu}>
            <Link to={link}>
              <ListItemText>{text}</ListItemText>
            </Link>
          </ListItemButton>
        </ListItem>
      </div>
    );
  }
);

export default ProfileMenuItem;
