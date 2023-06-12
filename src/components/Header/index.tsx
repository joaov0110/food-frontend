import "./index.scss";

import { FC } from "react";

import { Grid } from "@mui/material";

import SearchInput from "../Form/SearchInput";
import ProfileMenu from "../ProfileMenu";

const Header: FC = () => {
  return (
    <header className="header">
      <Grid container>
        <Grid item xs={10}>
          <SearchInput />
        </Grid>
        <Grid item xs={2}>
          <ProfileMenu />
        </Grid>
      </Grid>
    </header>
  );
};

export default Header;
