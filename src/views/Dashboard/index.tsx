import "./index.scss";

import { FC } from "react";

import { Outlet } from "react-router-dom";

import { Grid } from "@mui/material";

import Header from "../../components/Header";
import Navigation from "../../components/Navigation";

const Dashboard: FC = () => {
  return (
    <section className="dashboard">
      <Grid container>
        <Grid item xs={3}>
          <Navigation />
        </Grid>
        <Grid item xs={9}>
          <Header />
          <div className="main-content">
            <Outlet />
          </div>
        </Grid>
      </Grid>
    </section>
  );
};

export default Dashboard;
