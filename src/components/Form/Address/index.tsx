import { FC, useEffect } from "react";

import { Box, Grid } from "@mui/material";

import TextInput from "../TextInput";

import useAddress from "../../../hooks/useAddress";
import useInitialRender from "../../../hooks/useInitialRender";

import { useFormContext } from "react-hook-form";

import "./index.scss";

const Address: FC = () => {
  const {
    addressData: { cep, logradouro, bairro, localidade, uf },
    debouncedAddress,
  } = useAddress();

  const { setValue } = useFormContext();

  const isInitialRender = useInitialRender();

  useEffect(() => {
    if (!isInitialRender) {
      setValue("street", logradouro);
      setValue("district", bairro);
      setValue("UF", uf);
      setValue("city", localidade);
    }
  }, [cep]);

  const onAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    debouncedAddress(value);
  };

  return (
    <Box className="address-form">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={5}>
          <TextInput
            name="postalCode"
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
