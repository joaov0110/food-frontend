import "./index.scss";

import { FC, memo } from "react";

import { useNavigate } from "react-router-dom";

import { Box, Avatar, Grid } from "@mui/material";

interface IPointItem {
  point: {
    id: number;
    name: string;
    bgImage_url?: string | null;
    image_url?: string | null;
    point_address: {
      street?: string | null;
      street_number?: string | null;
      district?: string | null;
    };
  };
}

const PointItem: FC<IPointItem> = memo(({ point }) => {
  const { id, name, point_address } = point;

  const navigate = useNavigate();

  const handleNavigation = () => {
    return navigate(`${id}`);
  };

  const renderAddressInfo = () => {
    if (point_address.street) {
      return (
        <span className="point_item__info__address">
          {point_address.street} {point_address.street_number} -
          {point_address.district}
        </span>
      );
    }
  };

  return (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <Box className="point_item" onClick={handleNavigation}>
        <div className="point_item__cover">
          <img
            src="https://www.bookhubpublishing.com/wp-content/uploads/revslider/the7-book-header/bg-slider-book-1500x750.jpg"
            alt="bg image"
          />
        </div>
        <Box className="point_item__info">
          <div className="point_item__info__image">
            <Avatar src="" alt="image" />
          </div>

          <h3 className="point_item__info__name">{name}</h3>
          {renderAddressInfo()}
        </Box>
      </Box>
    </Grid>
  );
});

export default PointItem;
