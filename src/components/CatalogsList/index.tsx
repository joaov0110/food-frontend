import { useParams } from "react-router-dom";
import { GET_CATALOGS_POINT } from "../../constants/queries";
import useCatalogs from "../../hooks/useCatalogsClient";
import { useQuery } from "react-query";
import { Grid } from "@mui/material";
import CircularSpinner from "../Spinner";
import AddCatalogDialog from "../Dialogs/AddCatalogDialog";
import CatalogItem from "../CatalogItem";
import "./index.scss";

const CatalogsList = () => {
  const { getCatalogsByPoint } = useCatalogs();

  const { point_id } = useParams();

  const { data, isLoading, isError, isFetchedAfterMount } = useQuery({
    queryKey: [GET_CATALOGS_POINT, point_id!],
    queryFn: () => getCatalogsByPoint(point_id!),
    retry: 1,
  });

  if (isLoading && !isFetchedAfterMount) {
    return (
      <CircularSpinner
        styles={{
          height: "100px",
        }}
      />
    );
  }

  const renderNoCatalogsAvailable = () => {
    if (!data || isError) {
      return (
        <h2 className="catalogsList__no-catalogs">
          No catalogs created for this point...
        </h2>
      );
    }
  };

  const renderCatalogItems = () => {
    if (data) {
      return data.map((catalog) => {
        return <CatalogItem key={catalog.id} name={catalog.name} />;
      });
    }

    return null;
  };

  const renderHeading = () => {
    if (data) {
      return <h2 className="catalogsList__heading">Seus catálogos</h2>;
    }
  };

  return (
    <div className="catalogsList__container">
      {renderNoCatalogsAvailable()}
      <AddCatalogDialog point_id={point_id!} />

      {renderHeading()}
      <Grid container>{renderCatalogItems()}</Grid>
    </div>
  );
};

export default CatalogsList;
