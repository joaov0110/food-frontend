import { FC, memo } from "react";
import { Grid } from "@mui/material";
import "./index.scss";

interface IcatalogItem {
  id?: number;
  name: string;
}

const CatalogItem: FC<IcatalogItem> = memo(({ name }) => {
  return (
    <Grid item xs={12} sm={12} md={4}>
      <div className="catalogItem__item">
        <h3 className="catalogItem__item__heading">{name}</h3>
      </div>
    </Grid>
  );
});

export default CatalogItem;
