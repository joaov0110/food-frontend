import { FC } from "react";

import { Alert } from "@mui/material";
import { useWarningData, useWarningMethods } from "../../hooks/useWarning";

import "./index.scss";

const AppAlert: FC = () => {
  const { open, type, message } = useWarningData();
  const { closeWarning } = useWarningMethods();

  if (open) {
    return (
      <Alert severity={type} className="app-alert" onClose={closeWarning}>
        {message}
      </Alert>
    );
  }

  return null;
};

export default AppAlert;
