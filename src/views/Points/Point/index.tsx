import "./index.scss";

import { FC } from "react";

import { useNavigate } from "react-router-dom";

import { Avatar, Button } from "@mui/material";

import { ArrowBack, Settings } from "@mui/icons-material";

interface IPoint {
  point: {
    // bg_url: string;
    // image_url: string;
    // point_name: string;
    // point_address: {
    //   street: string;
    //   street_number: number;
    //   district: string;
    // };
  };
}

const Point: FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    return navigate(-1);
  };

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
        <h2 className="point__info__name">Divino</h2>
      </div>
    </section>
  );
};

export default Point;
