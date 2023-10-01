import "./index.scss";

import { FC, useRef } from "react";
import { useQuery } from "react-query";

import { ClickAwayListener, Skeleton } from "@mui/material";

import Menu from "./Menu";
import ProfileMenuItem from "./MenuItem";

import useUser from "../../hooks/useUserClient";
import { GET_USER } from "../../constants/queries";

interface IshapeMenuItems {
  id: number;
  text: string;
  link: string;
  divider?: boolean;
}

const shapeMenuItems = (data: IshapeMenuItems) => {
  const { id, text, link, divider } = data;

  return {
    id,
    text,
    link,
    divider,
  };
};

const menuItems = [
  shapeMenuItems({ id: 0, text: "Profile", link: "profile" }),
  shapeMenuItems({ id: 1, text: "Logout", link: "/logout", divider: true }),
];

const ProfileMenu: FC = () => {
  const { fetchUser } = useUser();

  const menuRef = useRef<any>(null);

  const { isLoading, isError, data } = useQuery({
    queryKey: [GET_USER],
    queryFn: fetchUser,
  });

  const handleHideMenu = () => {
    menuRef.current.hideMenu();
  };

  const renderMenuItems = () => {
    return menuItems.map((item) => {
      return (
        <ProfileMenuItem
          key={item.id}
          data={item}
          handleHideMenu={handleHideMenu}
        />
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
          <Menu
            ref={menuRef}
            data={{
              name: data!.name,
              email: data!.email,
              image_url: data!.image_url,
            }}
          >
            {renderMenuItems()}
          </Menu>
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default ProfileMenu;
