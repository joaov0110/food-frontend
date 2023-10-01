import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Slide,
  Breakpoint,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Close } from "@mui/icons-material";
import { TransitionProps } from "@mui/material/transitions";
import "./index.scss";

interface ICustomDialog {
  children: React.ReactNode;
  data: {
    openerText?: string;
    dialogLabel?: string;
    dialogTitle: string;
    dialogWidth?: Breakpoint;
    closeButtonText?: string;
    confirmButtonText?: string;
    disableButton?: boolean;
    buttonType?: "default" | "loading";
    loadingState?: boolean;
    opener?: React.ReactNode;
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

const CustomDialog = forwardRef(
  ({ children, data, methods }: ICustomDialog, ref) => {
    const {
      openerText,
      dialogLabel,
      dialogTitle,
      dialogWidth,
      closeButtonText,
      confirmButtonText,
      disableButton,
      buttonType,
      loadingState,
      opener,
    } = data;

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen((previous) => !previous);
    };

    useImperativeHandle(
      ref,
      () => ({
        handleOpen,
      }),
      []
    );

    const handleAction = () => {
      methods?.confirmationAction && methods.confirmationAction();
    };

    const renderCloseButtonText = () => closeButtonText || "Fechar";

    const renderConfirmButtonText = () => confirmButtonText || "Confirmar";

    const renderConfirmButton = () => {
      if (buttonType === "loading") {
        return (
          <LoadingButton
            variant="contained"
            loading={loadingState}
            disabled={disableButton}
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
    };

    const renderOpener = () => {
      if (opener) {
        return <div onClick={handleOpen}>{opener}</div>;
      }

      return (
        <Button variant="contained" onClick={handleOpen}>
          {openerText}
        </Button>
      );
    };

    return (
      <div className="customDialog__container">
        {renderOpener()}
        <Dialog
          fullWidth
          maxWidth={dialogWidth || "sm"}
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
            {renderConfirmButton()}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
);

export default CustomDialog;
