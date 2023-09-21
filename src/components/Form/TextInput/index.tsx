import { FC } from "react";
import { TextField } from "@mui/material";

import { Controller, useFormContext } from "react-hook-form";

import "./index.scss";

interface ItextInput {
  name: string;
  placeholder: string;
  customChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: FC<ItextInput> = ({ name, placeholder, customChange }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextField
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (customChange) {
              customChange(e);
            }

            onChange(e);
          }}
          onBlur={onBlur}
          placeholder={placeholder}
          label={placeholder}
          variant="filled"
          error={!!errors[name]}
          helperText={errors[name]?.message as string}
          className="text-input"
        />
      )}
    />
  );
};

export default TextInput;
