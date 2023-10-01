import { FC } from "react";
import { IPoint } from "../../../interfaces/pointInterface";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import ProfileImage from "../../../components/ProfileImage";
import FileUploadDialog from "../../../components/Dialogs/FileUploadDialog";
import UpdatePointDialog from "../../../components/Dialogs/UpdatePointDialog";
import CircularSpinner from "../../../components/Spinner";
import usePoints from "../../../hooks/usePointsClient";
import { GET_POINT } from "../../../constants/queries";
import { renderProfileImages } from "../../../utils/renderProfileImages";
import CoverImage from "../../../components/CoverImage";
import "./index.scss";

const Point: FC = () => {
  const navigate = useNavigate();

  const { point_id } = useParams();

  const { fetchPoint, updatePointProfilePicture, updatePointBgImage } =
    usePoints();

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
        <FileUploadDialog
          data={{
            dialogTitle: "Change point cover image",
            confirmButtonText: "Save",
            buttonType: "loading",
            opener: (
              <CoverImage image={renderProfileImages(data?.bgImage_url)} />
            ),
            additionalReqParams: {
              point_id: point_id!,
            },
            invalidateQuery: GET_POINT,
          }}
          methods={{
            uploader: updatePointBgImage,
          }}
        />
      </div>

      <div className="point__info">
        <div className="point__info__image">
          <FileUploadDialog
            data={{
              dialogTitle: "Change point profile image",
              confirmButtonText: "Save",
              buttonType: "loading",
              opener: (
                <ProfileImage image={renderProfileImages(data?.image_url)} />
              ),
              additionalReqParams: {
                point_id: point_id!,
              },
              invalidateQuery: GET_POINT,
            }}
            methods={{
              uploader: updatePointProfilePicture,
            }}
          />
        </div>
        <div className="point__info__settingsBtn__container">
          <UpdatePointDialog />
        </div>
        <h2 className="point__info__name">{data?.name}</h2>
        <div className="point__info__address">
          <p>
            {data?.address?.street}, {data?.address?.street_number},{" "}
            {data?.address?.district} - {data?.address?.city},{" "}
            {data?.address?.UF}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Point;
