import { FC, useRef } from "react";
import CustomDialog from "../Dialog";
import FileInput from "../../Form/FileInput";
import { IimageInputData } from "../../../interfaces/imageInputData";
import "./index.scss";

interface IFileUploadDialog {
  data: {
    dialogTitle: string;
    confirmButtonText: string;
    openerText?: string;
    buttonType?: "default" | "loading";
    opener?: React.ReactNode;
  };
}

const FileUploadDialog: FC<IFileUploadDialog> = ({ data }) => {
  const { openerText, dialogTitle, confirmButtonText, buttonType, opener } =
    data;

  const imageData = useRef<IimageInputData | null>({} as IimageInputData);

  const handleImageData = (data: IimageInputData) => {
    imageData.current = { ...data };
  };

  const handleWipeImageData = () => {
    imageData.current = null;
  };

  return (
    <CustomDialog
      data={{
        openerText,
        dialogTitle,
        confirmButtonText,
        buttonType,
        opener,
      }}
    >
      <div className="fileUpload__content">
        <FileInput
          handleImageData={handleImageData}
          handleWipeImageData={handleWipeImageData}
        />
      </div>
    </CustomDialog>
  );
};

export default FileUploadDialog;
