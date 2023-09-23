import React, { FC, useState, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Slide,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Close } from "@mui/icons-material";
import { TransitionProps } from "@mui/material/transitions";
import "./index.scss";

interface ICustomDialog {
  children: React.ReactNode;
  data: {
    openerText: string;
    dialogLabel?: string;
    dialogTitle: string;
    closeButtonText?: string;
    confirmButtonText?: string;
    buttonType?: "default" | "loading";
    loadingState?: boolean;
  };
  methods?: {
    confirmationAction?: () => void;
  };
}

const Transition = React.forwardRef(
  (
    props: TransitionProps & { children: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
  ) => {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

const CustomDialog: FC<ICustomDialog> = ({ children, data, methods }) => {
  const {
    openerText,
    dialogLabel,
    dialogTitle,
    closeButtonText,
    confirmButtonText,
    buttonType,
    loadingState,
  } = data;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((previous) => !previous);
  };

  const handleAction = () => {
    if (methods?.confirmationAction) {
      methods.confirmationAction();
    }

    handleOpen();
  };

  const renderCloseButtonText = () => closeButtonText || "Fechar";

  const renderConfirmButtonText = () => confirmButtonText || "Confirmar";

  const renderConfirmButton = useMemo(() => {
    if (buttonType === "loading") {
      return (
        <LoadingButton
          variant="contained"
          loading={loadingState}
          onClick={handleAction}
        >
          {renderConfirmButtonText()}
        </LoadingButton>
      );
    }

    return (
      <Button variant="contained" onClick={handleAction}>
        {renderConfirmButtonText()}
      </Button>
    );
  }, [buttonType]);

  return (
    <div className="customDialog__container">
      <Button variant="contained" onClick={handleOpen}>
        {openerText}
      </Button>

      <Dialog
        fullWidth
        maxWidth="sm"
        TransitionComponent={Transition}
        onClose={handleOpen}
        aria-labelledby={dialogLabel || "Custom dialog"}
        open={open}
        className="customDialogBox"
      >
        <DialogTitle>{dialogTitle}</DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleOpen}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>

        <DialogContent dividers>{children}</DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={handleOpen}>
            {renderCloseButtonText()}
          </Button>
          {renderConfirmButton}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomDialog;
