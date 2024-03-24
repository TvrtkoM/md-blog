"use client";
import { useAlertMessageSelector } from "@/state/selectors";
import { hideMessage } from "@/state/slices/alert/alertSlice";
import { IoIosClose } from "react-icons/io";
import { useDispatch } from "react-redux";

const Alert = () => {
  const message = useAlertMessageSelector();
  const dispatch = useDispatch();
  return (
    message && (
      <div className="fixed top-0 container bg-destructive text-stone-50 text-sm h-8">
        <div className="h-full flex items-center justify-between">
          <p>{message}</p>
          <IoIosClose
            size={32}
            className="cursor-pointer"
            onClick={() => {
              dispatch(hideMessage());
            }}
          />
        </div>
      </div>
    )
  );
};

export default Alert;
