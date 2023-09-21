import { FC, useMemo } from "react";
import { Grid } from "@mui/material";
import PointItem from "../../components/PointItem";
import usePoints from "../../hooks/usePoints";
import CircularSpinner from "../../components/Spinner";
import "./index.scss";

const Points: FC = () => {
  const {
    getPoints: { isLoading, data },
  } = usePoints();

  const renderPointsList = useMemo(() => {
    if (data?.length) {
      return data.map((point) => {
        return (
          <Grid item xs={12} sm={12} md={6} lg={4} key={point.id}>
            <PointItem
              point={{
                ...point,
                point_address: {
                  street: point.address?.street,
                  street_number: point.address?.street_number,
                  district: point.address?.district,
                },
              }}
            />
          </Grid>
        );
      });
    }

    return null;
  }, [data]);

  if (isLoading) {
    return <CircularSpinner size={90} />;
  }

  return (
    <section className="points">
      <h1 className="points__heading">Points</h1>
      <Grid container spacing={2}>
        {renderPointsList}
      </Grid>
    </section>
  );
};

export default Points;
