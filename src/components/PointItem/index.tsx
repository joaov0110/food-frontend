import "./index.scss";

import { FC, memo } from "react";

import { useNavigate } from "react-router-dom";

import { Box, Grid } from "@mui/material";

import ProfileImage from "../ProfileImage";
import { renderProfileImages } from "../../utils/renderProfileImages";

interface IPointItem {
  point: {
    id: number;
    name: string;
    bgImage_url?: string | null;
    image_url?: string | null;
    street?: string | null;
    street_number?: string | null;
    district?: string | null;
  };
}

const PointItem: FC<IPointItem> = memo(({ point }) => {
  const { id, image_url, bgImage_url, name, street, street_number, district } =
    point;

  const navigate = useNavigate();

  const handleNavigation = () => {
    return navigate(`${id}`);
  };

  const renderAddressInfo = () => {
    if (street) {
      return (
        <span className="point_item__info__address">
          {street} {street_number} -{district}
        </span>
      );
    }
  };

  return (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <Box className="point_item" onClick={handleNavigation}>
        <div className="point_item__cover">
          <img src={renderProfileImages(bgImage_url)} alt="bg image" />
        </div>
        <Box className="point_item__info">
          <div className="point_item__info__image">
            <ProfileImage image={renderProfileImages(image_url)} />
          </div>

          <h3 className="point_item__info__name">{name}</h3>
          {renderAddressInfo()}
        </Box>
      </Box>
    </Grid>
  );
});

export default PointItem;
