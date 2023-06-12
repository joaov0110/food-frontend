import "./index.scss";

import { FC } from "react";

import { Grid } from "@mui/material";

import PointItem from "../../components/PointItem";

const pointsList = [
  {
    id: 0,
  },
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

const Points: FC = () => {
  const renderPointsList = () => {
    return pointsList.map((point) => {
      return (
        <Grid item xs={12} sm={12} md={6} lg={4} key={point.id}>
          <PointItem
            point={{
              id: point.id,
            }}
          />
        </Grid>
      );
    });
  };

  return (
    <section className="points">
      <h1 className="points__heading">Points</h1>
      <Grid container spacing={2}>
        {renderPointsList()}
      </Grid>
    </section>
  );
};

export default Points;
