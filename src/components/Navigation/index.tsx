import "./index.scss";

import { FC } from "react";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Inbox } from "@mui/icons-material";

import { Link } from "react-router-dom";

import ProfileWidget from "../ProfileWidget";

interface IshapeNavigation {
  id: number;
  icon: string;
  text: string;
  link: string;
}

const shapeNavigationItems = (data: IshapeNavigation) => {
  const { id, icon, text, link } = data;
  return {
    id,
    icon,
    text,
    link,
  };
};

const navigationItems = [
  shapeNavigationItems({
    id: 0,
    icon: "",
    text: "Dashboard",
    link: "/dashboard",
  }),
  shapeNavigationItems({ id: 1, icon: "", text: "Points", link: "points" }),
  shapeNavigationItems({ id: 2, icon: "", text: "Catalogs", link: "catalogs" }),
];

const Navigation: FC = () => {
  const renderNavigationItems = () => {
    return navigationItems.map((navItem) => {
      return (
        <ListItem key={navItem.id}>
          <ListItemButton>
            <Link to={navItem.link} className="navigation__link">
              <ListItemIcon>
                <Inbox />
              </ListItemIcon>
              <ListItemText
                primary={navItem.text}
                className="navigation__text"
              />
            </Link>
          </ListItemButton>
        </ListItem>
      );
    });
  };

  return (
    <nav className="navigation" aria-label="main navigation">
      <ProfileWidget />
      <List disablePadding>{renderNavigationItems()}</List>
    </nav>
  );
};

export default Navigation;
