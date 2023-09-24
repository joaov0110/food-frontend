import { FC, useRef } from "react";
import { useQueryClient, useMutation, MutationFunction } from "react-query";
import CustomDialog from "../Dialog";
import FileInput from "../../Form/FileInput";
import { IimageInputData } from "../../../interfaces/imageInputData";
import "./index.scss";
import { useWarningMethods } from "../../../hooks/useWarning";
import { GET_USER } from "../../../constants/queries";

interface IFileUploadDialog {
  data: {
    dialogTitle: string;
    confirmButtonText: string;
    openerText?: string;
    buttonType?: "default" | "loading";
    opener?: React.ReactNode;
  };
  methods: {
    uploader: (file: File) => void;
  };
}

const FileUploadDialog: FC<IFileUploadDialog> = ({ data, methods }) => {
  const { openerText, dialogTitle, confirmButtonText, buttonType, opener } =
    data;

  const { uploader } = methods;

  const { openWarning } = useWarningMethods();

  const imageData = useRef<IimageInputData | null>({} as IimageInputData);

  const queryClient = useQueryClient();

  const uploadProfilePicture = useMutation(uploader as MutationFunction, {
    onSuccess: () => {
      queryClient.invalidateQueries(GET_USER);
      openWarning({
        type: "success",
        message: "Profile image updated",
      });
    },
    onError: (err: any) => {
      openWarning({
        type: "error",
        message: "Internal",
      });
    },
  });

  const handleImageData = (data: IimageInputData) => {
    imageData.current = { ...data };
  };

  const handleWipeImageData = () => {
    imageData.current = null;
  };

  const handleDispatchMutation = () => {
    const formData = new FormData();

    formData.append(
      "profilePicture",
      imageData.current?.image,
      imageData.current?.imageName
    );

    uploadProfilePicture.mutate(formData);
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
      methods={{
        confirmationAction: handleDispatchMutation,
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
