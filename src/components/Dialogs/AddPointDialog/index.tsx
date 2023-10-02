import { FC } from "react";
import CustomDialog from "../Dialog";
import { useForm, FormProvider } from "react-hook-form";
import usePoints from "../../../hooks/usePointsClient";
import { useMutation, useQueryClient } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "../../Form/TextInput";
import { Grid } from "@mui/material";
import * as yup from "yup";
import { GET_POINTS } from "../../../constants/queries";
import { IcreatePoint } from "../../../interfaces/pointInterface";
import { useWarningMethods } from "../../../hooks/useWarning";

const createPointSchema = yup.object({
  name: yup.string().max(25).required("Field is required"),
  email: yup.string().max(50).email().required(),
  phone: yup.string().max(15).required(),
});

const AddPointDialog: FC = () => {
  const queryClient = useQueryClient();

  const { createPoint } = usePoints();

  const { openWarning } = useWarningMethods();

  const { mutate, isLoading } = useMutation(createPoint, {
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({ queryKey: GET_POINTS }),
        openWarning({
          type: "success",
          message: response,
        });
    },
    onError: (err: any) => {
      openWarning({
        type: "error",
        message: err.message,
      });
    },
  });

  const methods = useForm({
    resolver: yupResolver(createPointSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const { handleSubmit } = methods;

  const submit = (data: IcreatePoint) => {
    mutate(data);
  };

  return (
    <CustomDialog
      data={{
        openerText: "Add point",
        dialogTitle: "New point",
        confirmButtonText: "Create",
        loadingState: isLoading,
        buttonType: "loading",
      }}
      methods={{
        confirmationAction: handleSubmit(submit),
      }}
    >
      <FormProvider {...methods}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextInput name="name" placeholder="Point name" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextInput name="email" placeholder="Point email" />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextInput name="phone" placeholder="Point phone" />
          </Grid>
        </Grid>
      </FormProvider>
    </CustomDialog>
  );
};

export default AddPointDialog;
