import { FC } from "react";
import { IPoint } from "../../../interfaces/pointInterface";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Avatar, Button } from "@mui/material";
import { ArrowBack, Settings } from "@mui/icons-material";
import CircularSpinner from "../../../components/Spinner";
import usePoints from "../../../hooks/usePointsClient";
import { GET_POINT } from "../../../constants/queries";
import "./index.scss";

const Point: FC = () => {
  const navigate = useNavigate();

  const { point_id } = useParams();

  const { fetchPoint } = usePoints();

  const { isLoading, data } = useQuery<IPoint, Error>({
    queryKey: [GET_POINT, point_id],
    queryFn: () => fetchPoint(parseInt(point_id!, 10)),
  });

  const handleGoBack = () => {
    return navigate("/dashboard/points");
  };

  if (isLoading) {
    return <CircularSpinner size={90} />;
  }

  return (
    <section className="point">
      <Button variant="text" className="point__goBack" onClick={handleGoBack}>
        <ArrowBack color="action" />
      </Button>

      <div className="point__cover">
        <Button className="point__cover__settings_btn">
          <Settings fontSize="large" color="primary" />
        </Button>
        <img
          src="https://www.bookhubpublishing.com/wp-content/uploads/revslider/the7-book-header/bg-slider-book-1500x750.jpg"
          alt="cover"
        />
      </div>

      <div className="point__info">
        <div className="point__info__image">
          <Avatar src="" alt="avatar" />
        </div>
        <h2 className="point__info__name">{data?.name}</h2>
      </div>
    </section>
  );
};

export default Point;
