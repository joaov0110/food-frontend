import { FC, useRef } from "react";
import CustomDialog from "../Dialog";
import { useForm, FormProvider } from "react-hook-form";
import usePoints from "../../../hooks/usePointsClient";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "../../Form/TextInput";
import Address from "../../Form/Address";
import { Grid } from "@mui/material";
import * as yup from "yup";
import { GET_POINT, GET_POINTS } from "../../../constants/queries";
import {
  IPoint,
  IupdatePointFormValues,
} from "../../../interfaces/pointInterface";
import { useWarningMethods } from "../../../hooks/useWarning";
import { addressSchema } from "../../../schemas/addressSchema";
import { useParams } from "react-router-dom";

const updatePointSchema = yup.object({
  name: yup.string().max(25).required("Field is required"),
  email: yup.string().max(50).email().required("Field is required"),
  phone: yup.string().max(15).required("Field is required"),
  ...addressSchema,
});

const UpdatePointDialog: FC = () => {
  const queryClient = useQueryClient();

  const updateDialogRef = useRef<any>(null);

  const { point_id } = useParams();

  const { fetchPoint, updatePoint } = usePoints();

  const { openWarning } = useWarningMethods();

  const point = useQuery<IPoint, Error>({
    queryKey: [GET_POINT, point_id],
    queryFn: () => fetchPoint(parseInt(point_id!, 10)),
  });

  const { mutate, isLoading } = useMutation(updatePoint, {
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({ queryKey: GET_POINTS }),
        openWarning({
          type: "success",
          message: response,
        });
      updateDialogRef.current.handleOpen();
    },
    onError: (err: any) => {
      openWarning({
        type: "error",
        message: err.message,
      });
    },
  });

  const methods = useForm({
    resolver: yupResolver(updatePointSchema),
    defaultValues: {
      name: point.data?.name || "",
      email: point.data?.email || "",
      phone: point.data?.phone || "",
      postalCode: point.data?.address?.postalCode || "",
      street: point.data?.address?.street || "",
      street_number: point.data?.address?.street_number || "",
      district: point.data?.address?.district || "",
      city: point.data?.address?.city || "",
      UF: point.data?.address?.UF || "",
    },
  });

  const {
    handleSubmit,
    formState: { isDirty, isValid },
  } = methods;

  const submit = (data: IupdatePointFormValues) => {
    mutate({
      point_id: point_id!,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: {
        postalCode: data.postalCode,
        street: data.street,
        street_number: data.street_number,
        district: data.district,
        city: data.city,
        UF: data.UF,
      },
    });
  };

  return (
    <CustomDialog
      ref={updateDialogRef}
      data={{
        openerText: "Update point",
        dialogTitle: "Update point",
        confirmButtonText: "Confirm",
        loadingState: isLoading,
        dialogWidth: "md",
        disableButton: !isDirty || !isValid,
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
        <Address />
      </FormProvider>
    </CustomDialog>
  );
};

export default UpdatePointDialog;
