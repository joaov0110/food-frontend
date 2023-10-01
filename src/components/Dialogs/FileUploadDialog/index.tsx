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
    additionalReqParams?: {
      [key: string]: number | string;
    };
    invalidateQuery: string;
  };
  methods: {
    uploader: (...args: any[]) => void;
  };
}

const FileUploadDialog: FC<IFileUploadDialog> = ({ data, methods }) => {
  const {
    openerText,
    dialogTitle,
    confirmButtonText,
    buttonType,
    opener,
    additionalReqParams,
    invalidateQuery,
  } = data;
  const { uploader } = methods;
  const { openWarning } = useWarningMethods();
  const imageData = useRef<IimageInputData | null>({} as IimageInputData);
  const customDialogRef = useRef<any>(null);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(uploader as MutationFunction, {
    onSuccess: () => {
      queryClient.invalidateQueries(invalidateQuery);
      openWarning({
        type: "success",
        message: "Profile image updated",
      });
      handleCloseDialogOnSuccess();
    },
    onError: (err: any) => {
      openWarning({
        type: "error",
        message: err.message,
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

    formData.append("image", imageData.current?.image);

    if (additionalReqParams) {
      for (const prop in additionalReqParams) {
        formData.append(prop, additionalReqParams[prop].toString());
      }
    }

    mutate(formData);
  };

  const handleCloseDialogOnSuccess = () => {
    customDialogRef.current.handleOpen();
  };

  return (
    <CustomDialog
      ref={customDialogRef}
      data={{
        openerText,
        dialogTitle,
        confirmButtonText,
        buttonType,
        loadingState: isLoading,
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
