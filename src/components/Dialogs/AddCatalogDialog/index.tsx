import { FC, useRef } from "react";
import CustomDialog from "../Dialog";
import TextInput from "../../Form/TextInput";
import { useMutation, useQueryClient } from "react-query";
import useCatalogs from "../../../hooks/useCatalogsClient";
import { useWarningMethods } from "../../../hooks/useWarning";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { GET_CATALOGS_POINT } from "../../../constants/queries";

const addCatalogSchema = Yup.object({
  name: Yup.string().max(25).required("Field required"),
});

interface IaddCatalogDialog {
  point_id: string;
}

const AddCatalogDialog: FC<IaddCatalogDialog> = ({ point_id }) => {
  const dialogRef = useRef<any>(null);

  const { openWarning } = useWarningMethods();

  const { createCatalog } = useCatalogs();

  const queryCliente = useQueryClient();

  const { mutate, isLoading } = useMutation(createCatalog, {
    onSuccess: (response) => {
      queryCliente.invalidateQueries({ queryKey: GET_CATALOGS_POINT });
      openWarning({
        type: "success",
        message: response,
      });
      dialogRef.current.handleOpen();
    },
    onError: (err: any) => {
      openWarning({
        type: "error",
        message: err.message,
      });
    },
  });

  const form = useForm({
    resolver: yupResolver(addCatalogSchema),
    defaultValues: {
      name: "",
    },
  });

  const submit = (data: { name: string }) => {
    mutate({
      ...data,
      point_id,
    });
  };

  const {
    handleSubmit,
    formState: { isDirty, isValid },
  } = form;

  return (
    <CustomDialog
      ref={dialogRef}
      data={{
        openerText: "Create catalog",
        dialogTitle: "Create catalog",
        buttonType: "loading",
        disableButton: !isDirty || !isValid || isLoading,
      }}
      methods={{
        confirmationAction: handleSubmit(submit),
      }}
    >
      <FormProvider {...form}>
        <TextInput name="name" placeholder="Name" />
      </FormProvider>
    </CustomDialog>
  );
};

export default AddCatalogDialog;
