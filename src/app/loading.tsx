import CircleLoader from "@/components/ui/CircleLoader";
import React from "react";

const RootLoadingScreen = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <CircleLoader />
    </div>
  );
};

export default RootLoadingScreen;
