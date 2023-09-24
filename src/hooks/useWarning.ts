import { useContext } from "react";
import {
  WarningDataContext,
  WarningMethodsContext,
} from "../contexts/warningContext";

export const useWarningData = () => useContext(WarningDataContext);
export const useWarningMethods = () => useContext(WarningMethodsContext);
