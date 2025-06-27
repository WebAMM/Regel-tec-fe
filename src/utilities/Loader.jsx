import React, { useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
export function LoaderCenter() {
  const override = {
    display: "block",
    margin: "0 auto",
  };
  let [loading, setLoading] = useState(true);
  return (
    <div className="text-align-center">
      <PuffLoader loading={loading} cssOverride={override} size={50} color="#00B4F1"/>
    </div>
  );
}