import { FC } from "react";
import CoverImage from "../../components/CoverImage";
import ProfileImage from "../../components/ProfileImage";
import { Box, Skeleton, Grid } from "@mui/material";
import { Check } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import useUser, { updateUser } from "../../hooks/useUser";
import { useForm, FormProvider } from "react-hook-form";
import TextInput from "../../components/Form/TextInput";
import AppAlert from "../../components/Alert";
import Address from "../../components/Form/Address";
import profileSchema from "../../schemas/profileSchema";
import "./index.scss";

const Profile: FC = () => {
  const {
    user: { isLoading, isError, data },
    updateUser,
  } = useUser();

  const methods = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: data!.name,
      email: data!.email,
      document: data!.document,
      accountant_email: data!.accountant_email,
      accountant_name: data!.accountant_name,
      accountant_phone: data!.accountant_phone,
      image_url: data!.image_url,
      bgImage_url: data!.bgImage_url,
      postalCode: data!.address!.postalCode,
      street: data!.address!.street,
      street_number: data!.address!.street_number,
      district: data!.address!.district,
      city: data!.address!.city,
      UF: data!.address!.UF,
    },
  });

  const { handleSubmit } = methods;

  const submit = (data: updateUser) => {
    updateUser.mutate(data);
  };

  if (isLoading || isError) {
    return <Skeleton variant="circular" width={40} height={40} />;
  }

  return (
    <>
      <AppAlert
        data={{
          type: updateUser.isError ? "error" : "success",
          message: updateUser.isError
            ? (updateUser.error as string)
            : "Profile updated",
          open: updateUser.isError || updateUser.isSuccess,
        }}
      />
      <FormProvider {...methods}>
        <Box component="form" className="profile__settings">
          <CoverImage />
          <Box className="profile__settings__image">
            <ProfileImage />
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} className="input-item">
              <TextInput name="name" placeholder="Name" />
            </Grid>
            <Grid item xs={12} sm={4} className="input-item">
              <TextInput name="email" placeholder="Email" />
            </Grid>
            <Grid item xs={12} sm={4} className="input-item">
              <TextInput name="document" placeholder="Document" />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} className="input-item">
              <TextInput name="accountant_name" placeholder="Accountant name" />
            </Grid>
            <Grid item xs={12} sm={4} className="input-item">
              <TextInput
                name="accountant_email"
                placeholder="Accountant email"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextInput
                name="accountant_phone"
                placeholder="Accountant phone"
              />
            </Grid>
          </Grid>
          <Address />

          <Box className="button-container">
            <LoadingButton
              variant="contained"
              endIcon={<Check />}
              loading={updateUser.isLoading}
              loadingPosition="end"
              onClick={handleSubmit(submit)}
            >
              Salvar
            </LoadingButton>
          </Box>
        </Box>
      </FormProvider>
    </>
  );
};

export default Profile;
