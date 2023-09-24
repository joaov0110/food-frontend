import { AlertColor } from "@mui/material";
import React, { FC, createContext, useMemo, useState } from "react";

interface IwarningData {
  open: boolean;
  type: AlertColor;
  message: string;
}

interface IopenWarning {
  type: AlertColor;
  message: string;
}

interface IwarningMethods {
  openWarning: (data: IopenWarning) => void;
  closeWarning: () => void;
}

export const WarningDataContext = createContext<IwarningData>(
  {} as IwarningData
);
export const WarningMethodsContext = createContext<IwarningMethods>(
  {} as IwarningMethods
);

export const WarningProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [warningData, setWarningData] = useState<IwarningData>(
    {} as IwarningData
  );

  const methods = useMemo(() => {
    const openWarning = (data: IopenWarning) => {
      const { type, message } = data;

      setWarningData((prev: IwarningData) => {
        return {
          ...prev,
          open: true,
          type,
          message,
        };
      });
    };

    const closeWarning = () => {
      setWarningData((prev: IwarningData) => {
        return {
          ...prev,
          open: !prev.open,
        };
      });
    };
    return { openWarning, closeWarning };
  }, []);

  return (
    <WarningDataContext.Provider value={warningData}>
      <WarningMethodsContext.Provider value={methods}>
        {children}
      </WarningMethodsContext.Provider>
    </WarningDataContext.Provider>
  );
};
