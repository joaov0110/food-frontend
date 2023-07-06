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

import { NavLink } from "react-router-dom";

import ProfileWidget from "../ProfileWidget";

interface INavLinkState {
  isActive: boolean;
  isPending: boolean;
  link: string;
}

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
  shapeNavigationItems({
    id: 1,
    icon: "",
    text: "Points",
    link: "/dashboard/points",
  }),
  shapeNavigationItems({
    id: 2,
    icon: "",
    text: "Catalogs",
    link: "/dashboard/catalogs",
  }),
];

const Navigation: FC = () => {
  const handleActiveLink = (state: INavLinkState) => {
    const { isActive, isPending } = state;

    let classes = "navigation__link";

    if (isActive) {
      classes += " active";
    }

    if (isPending) {
      classes += " pending";
    }

    return classes;
  };

  const renderNavigationItems = navigationItems.map((navItem) => {
    return (
      <ListItem key={navItem.id}>
        <ListItemButton className="navigation__btn">
          <NavLink
            to={navItem.link}
            className={({ isActive, isPending }) =>
              handleActiveLink({ isActive, isPending, link: navItem.link })
            }
            end
          >
            <ListItemIcon>
              <Inbox />
            </ListItemIcon>
            <ListItemText primary={navItem.text} className="navigation__text" />
          </NavLink>
        </ListItemButton>
      </ListItem>
    );
  });

  return (
    <nav className="navigation" aria-label="main navigation">
      <ProfileWidget />
      <List disablePadding>{renderNavigationItems}</List>
    </nav>
  );
};

export default Navigation;
