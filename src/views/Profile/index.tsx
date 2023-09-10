import { FC } from "react";

import CoverImage from "../../components/CoverImage";
import ProfileImage from "../../components/ProfileImage";

import { Box, Skeleton, Grid, Button } from "@mui/material";
import { Check } from "@mui/icons-material";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import useUser from "../../hooks/useUser";

import { useForm, FormProvider } from "react-hook-form";

import TextInput from "../../components/Form/TextInput";

import Address, { addressSchema } from "../../components/Form/Address";

import "./index.scss";

const profileSchema = yup.object({
  name: yup.string().min(5).max(25).required("Field is required"),
  email: yup.string().min(10).max(50).email().required("Field is required"),
  accountant_name: yup.string().min(5).max(20).required("Field is required"),
  accountant_email: yup
    .string()
    .min(5)
    .max(20)
    .email()
    .required("Field is required"),
  accountant_phone: yup.string().min(13).max(13).required("Field is required"),
  ...addressSchema,
});

const Profile: FC = () => {
  const {
    user: { isLoading, isError, data },
  } = useUser();

  const methods = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: data!.name,
      email: data!.email,
      accountant_email: data!.accountant_email,
      accountant_name: data!.accountant_name,
      accountant_phone: data!.accountant_phone,
      cep: data!.address!.postalCode,
      street: data!.address!.street,
      street_number: data!.address!.street_number,
      district: data!.address!.district,
      city: data!.address!.city,
      UF: data!.address!.UF,
    },
  });

  const { handleSubmit } = methods;

  const submit = (d: any) => {
    console.log(d);
  };

  if (isLoading || isError) {
    return <Skeleton variant="circular" width={40} height={40} />;
  }

  return (
    <FormProvider {...methods}>
      <Box component="form" className="profile__settings">
        <CoverImage />
        <Box className="profile__settings__image">
          <ProfileImage />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} className="input-item">
            <TextInput name="name" placeholder="Name" />
          </Grid>
          <Grid item xs={12} sm={6} className="input-item">
            <TextInput name="email" placeholder="Email" />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} className="input-item">
            <TextInput name="accountant_name" placeholder="Accountant name" />
          </Grid>
          <Grid item xs={12} sm={6} className="input-item">
            <TextInput name="accountant_email" placeholder="Accountant email" />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextInput name="accountant_phone" placeholder="Accountant phone" />
          </Grid>
        </Grid>

        <Address />

        <Box className="button-container">
          <Button
            type="button"
            variant="contained"
            endIcon={<Check />}
            onClick={handleSubmit(submit)}
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default Profile;
