import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useAlertMessageSelector = () =>
  useSelector((state: RootState) => state.alert.message);
