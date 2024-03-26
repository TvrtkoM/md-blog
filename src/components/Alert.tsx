"use client";
import { useAlertMessageSelector } from "@/state/selectors";
import { hideMessage } from "@/state/slices/alert/alertSlice";
import { IoIosClose } from "react-icons/io";
import { useDispatch } from "react-redux";

const Alert = () => {
  const message = useAlertMessageSelector();
  // const message =
  //   "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium";
  const dispatch = useDispatch();
  return (
    message && (
      <div className="fixed top-12 right-12 w-56 rounded-sm p-3 bg-destructive text-stone-50 text-sm shadow-lg">
        <div className="flex items-center justify-between">
          <p className="w-4/5">{message}</p>
          <IoIosClose
            size={32}
            className="cursor-pointer mb-auto"
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
