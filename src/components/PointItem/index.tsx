import "./index.scss";

import { FC, memo } from "react";

import { useNavigate } from "react-router-dom";

import { Box, Avatar } from "@mui/material";

interface IPointItem {
  point: {
    id: number;
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

const PointItem: FC<IPointItem> = memo(({ point }) => {
  const { id } = point;

  const navigate = useNavigate();

  const handleNavigation = () => {
    return navigate(`${id}`);
  };

  return (
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

        <h3 className="point_item__info__name">Divino</h3>
        <span className="point_item__info__address">
          Rua Cantanhede 300 - Pirajussara
        </span>
      </Box>
    </Box>
  );
});

export default PointItem;
