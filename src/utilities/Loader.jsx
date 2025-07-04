import React, { useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
export function LoaderCenter({ color = "#00B4F1", size='40' }) {
  const override = {
    display: "block",
    margin: "0 auto",
  };
  let [loading, setLoading] = useState(true);
  return (
    <div className="text-align-center">
      <PuffLoader
        loading={loading}
        cssOverride={override}
        size={size}
        color={color}
      />
    </div>
  );
}
