import { FC, useMemo } from "react";
import { useQuery } from "react-query";
import { IPoint } from "../../interfaces/pointInterface";
import { Grid } from "@mui/material";
import PointItem from "../../components/PointItem";
import usePoints from "../../hooks/usePointsClient";
import CircularSpinner from "../../components/Spinner";
import { GET_POINTS } from "../../constants/queries";
import "./index.scss";

const Points: FC = () => {
  const { fetchPoints } = usePoints();

  const { isLoading, data } = useQuery<IPoint[], Error>({
    queryKey: [GET_POINTS],
    queryFn: fetchPoints,
  });

  const renderPointsList = useMemo(() => {
    if (data?.length) {
      return data.map((point) => {
        return (
          <PointItem
            key={point.id}
            point={{
              ...point,
              point_address: {
                street: point.address?.street,
                street_number: point.address?.street_number,
                district: point.address?.district,
              },
            }}
          />
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
