import { FC, useState, useEffect } from "react";

import { Alert, AlertColor } from "@mui/material";

import "./index.scss";

interface IalertData {
  open: boolean;
  type: AlertColor;
  message: string;
}

interface IAlert {
  data: IalertData;
}

const AppAlert: FC<IAlert> = (data) => {
  const { open, type, message } = data.data;
  const [openAlert, setOpenAlert] = useState(open);

  useEffect(() => {
    setOpenAlert(open);
  }, [open]);

  const handleOpenAlert = () => {
    setOpenAlert((prev) => !prev);
  };

  if (openAlert) {
    return (
      <Alert severity={type} className="app-alert" onClose={handleOpenAlert}>
        {message}
      </Alert>
    );
  }

  return null;
};

export default AppAlert;
