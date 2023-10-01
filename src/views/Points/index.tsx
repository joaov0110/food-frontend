import { FC } from "react";
import { useQuery } from "react-query";
import { IPoint } from "../../interfaces/pointInterface";
import { Grid } from "@mui/material";
import PointItem from "../../components/PointItem";
import usePoints from "../../hooks/usePointsClient";
import CircularSpinner from "../../components/Spinner";
import AddPointDialog from "../../components/Dialogs/AddPointDialog";
import { GET_POINTS } from "../../constants/queries";
import "./index.scss";

const Points: FC = () => {
  const { fetchPoints } = usePoints();

  const { isLoading, data } = useQuery<IPoint[], Error>({
    queryKey: [GET_POINTS],
    queryFn: fetchPoints,
  });

  const renderPointsList = () => {
    if (data?.length) {
      return data.map((point) => {
        return (
          <PointItem
            key={point.id}
            point={{
              id: point.id,
              name: point.name,
              bgImage_url: point.bgImage_url,
              image_url: point.image_url,
              street: point.address?.street,
              street_number: point.address?.street_number,
              district: point.address?.district,
            }}
          />
        );
      });
    }

    return null;
  };

  if (isLoading) {
    return <CircularSpinner size={90} />;
  }

  return (
    <section className="points">
      <header className="points__header">
        <h1 className="points__heading">Points</h1>
        <AddPointDialog />
      </header>
      <Grid container spacing={2}>
        {renderPointsList()}
      </Grid>
    </section>
  );
};

export default Points;
