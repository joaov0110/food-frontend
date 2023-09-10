import { FC } from "react";

import { Box, Grid } from "@mui/material";

import * as yup from "yup";

import TextInput from "../TextInput";

import useAddress from "../../../hooks/useAddress";

import "./index.scss";

export const addressSchema = {
  cep: yup.string().min(8).max(8).required("Field required"),
  street: yup.string().min(5).max(30).required("Field required"),
  street_number: yup.string().min(1).max(3).required("Field required"),
  district: yup.string().min(2).max(20).required("Field required"),
  city: yup.string().min(2).max(10).required("Field required"),
  UF: yup.string().min(2).max(2).required("Field required"),
};

const Address: FC = () => {
  const { addressData, debouncedAddress } = useAddress();

  const onAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    console.log(value);

    debouncedAddress(value);
  };

  return (
    <Box className="address-form">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={5}>
          <TextInput
            name="cep"
            placeholder="CEP"
            customChange={onAddressChange}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextInput name="street" placeholder="Street" />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextInput name="street_number" placeholder="Street number" />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={5}>
          <TextInput name="district" placeholder="District" />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextInput name="city" placeholder="City" />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextInput name="UF" placeholder="UF" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Address;
